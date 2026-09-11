import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { QueryParamProvider } from 'use-query-params';
import { WindowHistoryAdapter } from 'use-query-params/adapters/window';

import { useCoffeeChatFilters } from './useCoffeeChatFilters';

jest.mock('next/router', () => ({ useRouter: () => ({ isReady: true }) }));

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryParamProvider adapter={WindowHistoryAdapter}>{children}</QueryParamProvider>;
};

const navigate = (url: string) => {
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

describe('커피솝 필터 URL', () => {
  beforeEach(() => navigate('/coffeechat'));

  it('공유 URL의 조건을 복원하고 UI 표시값을 API 값으로 변환한다', () => {
    navigate('/coffeechat?section=프론트엔드&topicType=커리어&career=인턴&part=웹&search=토스');
    const { result } = renderHook(useCoffeeChatFilters, { wrapper: Wrapper });

    expect(result.current.filters).toEqual({
      section: '프론트엔드',
      topicType: '커리어',
      career: '인턴',
      part: '웹',
      search: '토스',
    });
    expect(result.current.apiParams).toEqual({
      section: '프론트',
      topicType: '커리어',
      career: '인턴 경험만 있어요',
      part: '웹',
      search: '토스',
    });
  });

  it('선택 변경은 방문 기록을 늘리지 않고 다른 query를 보존한다', async () => {
    navigate('/coffeechat?topicType=커리어&utm_source=shared');
    const historyLength = window.history.length;
    const { result } = renderHook(useCoffeeChatFilters, { wrapper: Wrapper });

    act(() => result.current.setFilter('section', '프론트엔드'));
    await waitFor(() => expect(result.current.filters.section).toBe('프론트엔드'));
    expect(window.history.length).toBe(historyLength);
    expect(new URLSearchParams(window.location.search).get('utm_source')).toBe('shared');
    expect(result.current.filters.topicType).toBe('커리어');
  });

  it('전체 선택과 검색 초기화는 URL에서 해당 조건을 제거한다', async () => {
    navigate('/coffeechat?section=프론트엔드&search=토스');
    const { result } = renderHook(useCoffeeChatFilters, { wrapper: Wrapper });

    act(() => result.current.setFilter('section', '전체'));
    await waitFor(() => expect(result.current.filters.section).toBe(''));
    expect(new URLSearchParams(window.location.search).has('section')).toBe(false);
    act(() => result.current.setFilter('search', ''));
    await waitFor(() => expect(window.location.search).toBe(''));
    expect(result.current.apiParams).toEqual({});
  });

  it('방문 기록 복원과 query 없는 메뉴 재진입을 구분한다', () => {
    const { result } = renderHook(useCoffeeChatFilters, { wrapper: Wrapper });
    act(() => navigate('/coffeechat?section=프론트엔드&search=토스'));
    expect(result.current.filters.section).toBe('프론트엔드');
    expect(result.current.filters.search).toBe('토스');
    act(() => navigate('/coffeechat'));
    expect(result.current.apiParams).toEqual({});
  });

  it('잘못된 필터와 전체는 무시하고 검색어 전체는 그대로 전달한다', () => {
    navigate('/coffeechat?section=unknown&topicType=전체&career=아직 없음&part=&search=전체');
    const { result } = renderHook(useCoffeeChatFilters, { wrapper: Wrapper });
    expect(result.current.apiParams).toEqual({ career: '아직 없어요', search: '전체' });
  });
});

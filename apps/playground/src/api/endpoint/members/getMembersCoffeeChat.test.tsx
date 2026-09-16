import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { QueryParamProvider } from 'use-query-params';
import { WindowHistoryAdapter } from 'use-query-params/adapters/window';

import { axiosInstance } from '@/api';
import { useCoffeeChatFilters } from '@/components/coffeechat/CoffeeChatCategory/useCoffeeChatFilters';

import { useGetMembersCoffeeChat } from './getMembersCoffeeChat';

jest.mock('@/api', () => ({ axiosInstance: { request: jest.fn() } }));
jest.mock('@/constants/env', () => ({ DEBUG: true }));

let mockIsReady = false;
jest.mock('next/router', () => ({ useRouter: () => ({ isReady: mockIsReady }) }));

let queryClient: QueryClient;
const request = jest.mocked(axiosInstance.request);
const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <QueryParamProvider adapter={WindowHistoryAdapter}>{children}</QueryParamProvider>
  </QueryClientProvider>
);

const useFilteredQuery = () => {
  const { filters, isReady } = useCoffeeChatFilters();
  return useGetMembersCoffeeChat(filters, { enabled: isReady });
};

describe('커피솝 필터 조회', () => {
  beforeEach(() => {
    mockIsReady = false;
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    request.mockReset();
    request.mockResolvedValue({ data: { coffeeChatList: [] } });
    window.history.replaceState(null, '', '/coffeechat');
  });

  afterEach(() => queryClient.clear());

  it('URL 준비 전에는 요청하지 않고 준비되면 변환한 필터로 조회한다', async () => {
    window.history.replaceState(
      null,
      '',
      '/coffeechat?section=프론트엔드&career=인턴&topicType=커리어&part=웹&search=토스',
    );
    const { result, rerender } = renderHook(useFilteredQuery, { wrapper: Wrapper });
    await act(async () => {});
    expect(request).not.toHaveBeenCalled();

    mockIsReady = true;
    rerender();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const params = { section: '프론트', career: '인턴 경험만 있어요', topicType: '커리어', part: '웹', search: '토스' };
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(expect.objectContaining({ params }));
    expect(queryClient.getQueryData(['getMembersCoffeeChat', params])).toEqual({ coffeeChatList: [] });
  });

  it('준비가 끝난 기본 필터는 빈 파라미터로 전체 목록을 조회한다', async () => {
    mockIsReady = true;
    const { result } = renderHook(useFilteredQuery, { wrapper: Wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(request).toHaveBeenCalledWith(expect.objectContaining({ params: {} }));
  });

  it('잘못된 URL 필터는 제외하고 경력 변환과 검색어 전체를 보존한다', async () => {
    mockIsReady = true;
    window.history.replaceState(null, '', '/coffeechat?section=unknown&topicType=전체&career=아직 없음&search=전체');
    const { result } = renderHook(useFilteredQuery, { wrapper: Wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({ params: { career: '아직 없어요', search: '전체' } }),
    );
  });
});

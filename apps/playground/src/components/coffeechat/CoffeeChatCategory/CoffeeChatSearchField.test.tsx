import { fireEvent, render, screen } from '@testing-library/react';

import CoffeeChatSearchField from './CoffeeChatSearchField';

describe('커피솝 검색창', () => {
  it('다른 필터로 포커스가 이동해도 검색어를 초기화하지 않는다', () => {
    const onReset = jest.fn();
    render(
      <>
        <CoffeeChatSearchField value='테스트 회사' onChange={jest.fn()} onSubmit={jest.fn()} onReset={onReset} />
        <button>주제</button>
      </>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.blur(input, { relatedTarget: screen.getByRole('button', { name: '주제' }) });

    expect(onReset).not.toHaveBeenCalled();
    expect(input).toHaveValue('테스트 회사');
  });

  it('초기화 버튼을 클릭한 경우에만 초기화를 요청한다', () => {
    const onReset = jest.fn();
    render(<CoffeeChatSearchField value='테스트 회사' onChange={jest.fn()} onSubmit={jest.fn()} onReset={onReset} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    const resetButton = screen.getByRole('button', { name: '검색어 초기화' });
    fireEvent.blur(input, { relatedTarget: resetButton });
    expect(onReset).not.toHaveBeenCalled();
    fireEvent.click(resetButton);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('입력 변경은 검색 제출과 구분한다', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    render(<CoffeeChatSearchField value='' onChange={onChange} onSubmit={onSubmit} onReset={jest.fn()} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '새 검색어' } });
    expect(onChange).toHaveBeenCalledWith('새 검색어');
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.submit(screen.getByRole('search'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

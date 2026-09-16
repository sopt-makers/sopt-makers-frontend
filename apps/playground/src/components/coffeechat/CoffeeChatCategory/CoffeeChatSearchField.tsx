import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconSearch, IconXClose } from '@sopt-makers/icons';
import { useState } from 'react';

interface Props {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

const CoffeeChatSearchField = ({ className, value, onChange, onSubmit, onReset }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SearchForm
      className={className}
      role='search'
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
    >
      <SearchInput
        aria-label='회사, 학교, 이름 검색'
        placeholder='회사, 학교, 이름을 검색해보세요!'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && event.nativeEvent.isComposing) event.preventDefault();
        }}
      />
      {isFocused && value ? (
        <SearchButton type='button' aria-label='검색어 초기화' onClick={onReset}>
          <IconXClose />
        </SearchButton>
      ) : (
        <SearchButton type='submit' aria-label='검색' disabled={!value}>
          <IconSearch />
        </SearchButton>
      )}
    </SearchForm>
  );
};

export default CoffeeChatSearchField;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  height: 48px;
`;

const SearchInput = styled.input`
  ${fonts.BODY_16_M};

  flex: 1;
  border: 0;
  background: transparent;
  min-width: 0;
  color: ${colors.white};

  &::placeholder {
    color: ${colors.gray400};
  }

  &:focus-visible {
    outline: none;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  color: ${colors.white};

  svg {
    width: 20px;
    height: 20px;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${colors.gray600};
  }
`;

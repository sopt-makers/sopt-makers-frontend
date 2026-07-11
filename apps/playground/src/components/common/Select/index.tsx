import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colorBg, colorFg, typography } from '@sopt-mds/design-tokens';
import { IconChevronDown } from '@sopt-mds/icons';
import type { SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: number | string;
  disabled?: boolean;
  error?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ width = 200, disabled = false, children, error, placeholder = '', ...props }, ref) => {
    return (
      <StyledSelectContainer width={width} error={error}>
        <select ref={ref} disabled={disabled} {...props}>
          <option value='' selected disabled hidden>
            {placeholder}
          </option>
          {children}
        </select>
        <StyledIconChevronDown />
      </StyledSelectContainer>
    );
  },
);

export default Select;

const StyledSelectContainer = styled.div<Pick<SelectProps, 'width' | 'error'>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 16px 10px 20px;
  height: 46px;
  ${({ width }) => `width: ${width}${typeof width === 'number' ? 'px' : ''};`}
  background-color: ${colorBg.neutral.ghost};
  ${typography.body1}
  color: ${colorFg.neutral.ghost};
  transition: all 0.2s;

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${colorFg.danger.default};
    `}
`;

const StyledIconChevronDown = styled(IconChevronDown)`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

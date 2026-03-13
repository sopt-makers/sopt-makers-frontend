import styled from '@emotion/styled';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import type { ButtonSize, ButtonStyle } from '@/components/common/Button/style';
import { buttonSize, buttonStyles } from '@/components/common/Button/style';
import { textStyles } from '@/styles/typography';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonStyle;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'medium', children, ...props }, ref) => {
    return (
      <StyledButton variant={variant} size={size} {...props} ref={ref}>
        {children}
      </StyledButton>
    );
  },
);

export default Button;

type StyledButtonProps = Required<Pick<ButtonProps, 'variant' | 'size'>>;

const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 100px;
  cursor: pointer;
  ${textStyles.SUIT_16_M};
  ${({ variant, size }) => [buttonStyles[variant], buttonSize[size]]};
`;

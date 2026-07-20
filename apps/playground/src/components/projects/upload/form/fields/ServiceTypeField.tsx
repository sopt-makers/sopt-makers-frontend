import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import type { ChangeEvent, FC } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';

export const serviceType = {
  WEB: 'WEB',
  APP: 'APP',
} as const;

type ServiceType = keyof typeof serviceType;

interface ServiceTypeFieldProps {
  className?: string;
  value: string[];
  onChange: (value: string[]) => void;
  errorMessage?: string;
}

const ServiceTypeField: FC<ServiceTypeFieldProps> = ({ className, value, onChange, errorMessage }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const serviceType = e.target.value as ServiceType;
    if (e.target.checked) {
      const newValue = [...value, serviceType];
      onChange(newValue);
    } else {
      const newValue = value.filter((value) => value !== serviceType);
      onChange(newValue);
    }
  };

  return (
    <>
      <StyledServiceTypeField className={className}>
        <StyledLabel checked={value.includes(serviceType.WEB)}>
          <input type='checkbox' value={serviceType.WEB} onChange={handleChange} />
          <span>웹</span>
        </StyledLabel>
        <StyledLabel checked={value.includes(serviceType.APP)}>
          <input type='checkbox' value={serviceType.APP} onChange={handleChange} />
          <span>앱</span>
        </StyledLabel>
      </StyledServiceTypeField>
      <StyledErrorMessage message={errorMessage} />
    </>
  );
};

export default ServiceTypeField;

const StyledServiceTypeField = styled.div`
  display: flex;
  gap: ${spacing.s8};
`;

const StyledLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s,
    color 0.2s;
  border-radius: 100px;
  background-color: ${colors.bg.neutral.ghost};
  cursor: pointer;
  padding: ${spacing.s10} ${spacing.s20};
  width: 156px;
  height: 42px;
  color: ${colors.fg.neutral.default};
  ${typography.label2}

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${colors.bg.neutral.inverse};
      color: ${colors.fg.neutral.inverse};
    `}

    input {
    display: none;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 10px 0;
`;

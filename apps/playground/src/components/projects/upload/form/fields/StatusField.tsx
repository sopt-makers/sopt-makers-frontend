import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { Toggle } from '@sopt-mds/ui';
import type { ChangeEvent } from 'react';

type Status = {
  isAvailable: boolean;
  isFounding: boolean;
};

interface StatusFieldProps {
  className?: string;
  value: Status;
  onChange: (value: Status) => void;
}

const StatusField = ({ className, value, onChange }: StatusFieldProps) => {
  const handleChange = (name: keyof Status) => (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [name]: e.target.checked,
    });
  };

  return (
    <StyledStatusField className={className}>
      <StyledWrapper>
        <StyledSubTitle>현재 이 서비스를 이용할 수 있나요?</StyledSubTitle>
        <Toggle size='large' checked={value.isAvailable} onChange={handleChange('isAvailable')} />
      </StyledWrapper>
      <StyledWrapper>
        <StyledSubTitle>현재 이 프로젝트로 창업을 진행하고 있나요?</StyledSubTitle>
        <Toggle size='large' checked={value.isFounding} onChange={handleChange('isFounding')} />
      </StyledWrapper>
    </StyledStatusField>
  );
};

export default StatusField;

const StyledStatusField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
`;

const StyledWrapper = styled.div`
  display: flex;
  gap: ${spacing.s10};
  align-items: center;
`;

const StyledSubTitle = styled.span`
  color: ${colors.fg.neutral.subtle};
  ${typography.body2}
`;

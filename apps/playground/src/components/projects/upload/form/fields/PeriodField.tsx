import styled from '@emotion/styled';
import { colors, spacing } from '@sopt-mds/design-tokens';
import { Checkbox } from '@sopt-mds/ui';

import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import { textStyles } from '@/styles/typography';

interface PeriodFieldProps {
  value: Value;
  onChange: (v: Value) => void;
  errorMessage?: string;
  isStartError: boolean;
  isEndError: boolean;
}

type Value = { startAt: string; endAt: string | null };

const PeriodField = ({ value, onChange, errorMessage, isStartError, isEndError }: PeriodFieldProps) => {
  const handleChange =
    <K extends keyof Value>(key: K) =>
    (e: { target: { value: string } }) => {
      onChange({ ...value, [key]: e.target.value });
    };

  const handleOngoingChange = (newValue: boolean) => {
    if (newValue) {
      onChange({ ...value, endAt: null });
    } else {
      onChange({ ...value, endAt: '' });
    }
  };

  return (
    <StyledPeriodField>
      <InputGroup>
        <StyledInput
          placeholder='YYYY.MM'
          value={value.startAt}
          onChange={handleChange('startAt')}
          error={isStartError}
        />
        {value.endAt !== null && (
          <>
            <Separator>{'-'}</Separator>
            <StyledInput
              placeholder='YYYY.MM'
              value={value.endAt}
              onChange={handleChange('endAt')}
              error={isEndError}
            />
          </>
        )}
      </InputGroup>
      <StyledCheckbox
        size='small'
        label='진행중'
        checked={value.endAt === null}
        onCheckedChange={handleOngoingChange}
      />
      <StyledErrorMessage message={errorMessage} />
    </StyledPeriodField>
  );
};

export default PeriodField;

const StyledPeriodField = styled.div``;

const StyledInput = styled(Input)`
  max-width: 163px;

  input::placeholder {
    color: ${colors.fg.neutral.ghost};
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled(Checkbox)`
  margin-top: ${spacing.s12};
  color: ${colors.fg.neutral.subtle};
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Separator = styled.span`
  margin: 0 11px;
  color: ${colors.fg.neutral.subtle};
  ${textStyles.SUIT_16_M};
`;

import styled from '@emotion/styled';
import { colors, radius, typography } from '@sopt-mds/design-tokens';
import { spacing } from '@sopt-mds/design-tokens';
import { Checkbox } from '@sopt-mds/ui';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Select from '@/components/common/Select';
import { GENERATIONS } from '@/constants/generation';

interface GenerationFieldProps {
  value: string | null;
  defaultValue: string;
  onChange: (value: string | null) => void;
  errorMessage?: string;
}

const GenerationField = ({ value, defaultValue, onChange, errorMessage }: GenerationFieldProps) => {
  return (
    <StyledGenerationField>
      <StyledSelect
        width={200}
        placeholder='선택'
        value={value ?? defaultValue}
        onChange={(e) => onChange(e.target.value)}
        error={Boolean(errorMessage)}
      >
        <option value={defaultValue}>선택</option>
        {GENERATIONS.map((item) => (
          <option key={item} value={item}>
            {item}기
          </option>
        ))}
      </StyledSelect>
      <StyledCheckbox
        size='small'
        label='특정 기수 활동으로 진행하지 않았어요'
        checked={value === null}
        onCheckedChange={(checked) => onChange(checked ? null : defaultValue)}
      />

      <StyledErrorMessage message={errorMessage} />
    </StyledGenerationField>
  );
};

export default GenerationField;

const StyledGenerationField = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled(Select)`
  width: 200px;
  color: ${colors.fg.neutral.ghost};
  background-color: ${colors.bg.layer.default};
  border-radius: ${radius.r10};
  padding: 15px ${spacing.s16};
  ${typography.body1};
`;

const StyledCheckbox = styled(Checkbox)`
  margin-top: ${spacing.s12};
  color: ${colors.fg.neutral.subtle};
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 10px 0;
`;

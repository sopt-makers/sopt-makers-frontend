import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import type { FC } from 'react';
import React from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Select from '@/components/common/Select';
import { categoryLabel } from '@/components/projects/upload/form/constants';

interface CategoryFieldProps {
  value: string | undefined;
  onChange: (value: string) => void;
  isError?: boolean;
  errorMessage?: string;
}
const CategoryField: FC<CategoryFieldProps> = ({ value, onChange, isError, errorMessage }) => {
  return (
    <StyledCategoryField>
      <StyledSelect
        width={200}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='선택'
        error={isError}
      >
        {Object.keys(categoryLabel).map((category) => (
          <option key={category} value={category}>
            {categoryLabel[category as keyof typeof categoryLabel]}
          </option>
        ))}
      </StyledSelect>
      <StyledErrorMessage message={errorMessage} />
    </StyledCategoryField>
  );
};

export default CategoryField;

const StyledCategoryField = styled.div`
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

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 10px 0;
`;

import { TextField } from '@sopt-mds/ui';
import { useController } from 'react-hook-form';
import { styled } from 'stitches.config';

import type { RoundFieldValues } from '../../schema';

const StartTimeField = () => {
  const {
    field,
    fieldState: { error },
  } = useController<RoundFieldValues, 'startTime'>({ name: 'startTime' });

  return (
    <STimeField>
      <TextField
        {...field}
        id='settlement-start-time'
        label='회식 시작 시간'
        placeholder='HH:MM'
        inputMode='numeric'
        autoComplete='off'
        errorMessage={error?.message}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
          field.onChange(digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits);
        }}
      />
    </STimeField>
  );
};

export default StartTimeField;

const STimeField = styled('div', {
  'width': 335,
  '@mobile': { width: '100%' },
});

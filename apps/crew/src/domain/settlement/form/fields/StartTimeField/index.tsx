import { spacing } from '@sopt-mds/design-tokens';
import { ActionButton, TextField } from '@sopt-mds/ui';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import { styled } from 'stitches.config';

import type { RoundFieldValues } from '../../schema';
import type { TimePeriod } from '../../time';
import { formatStartTimeInput, getStartTimeDisplay, TIME_PERIODS, to24HourStartTime } from '../../time';
import { SLabel } from '../style';

const StartTimeField = () => {
  const {
    field,
    fieldState: { error },
  } = useController<RoundFieldValues, 'startTime'>({ name: 'startTime' });
  const [display, setDisplay] = useState(() => getStartTimeDisplay(field.value));

  const commitTime = (input: string, period: TimePeriod = display.period) => {
    const value = to24HourStartTime(input, period);

    setDisplay(getStartTimeDisplay(value, period));
    field.onChange(value);
    field.onBlur();
  };

  return (
    <STimeField>
      <SLabel htmlFor='settlement-start-time'>회식 시작 시간</SLabel>
      <SControls>
        <STimeInput
          {...field}
          id='settlement-start-time'
          value={display.time}
          placeholder='HH:MM'
          inputMode='numeric'
          autoComplete='off'
          errorMessage={error?.message}
          onChange={(event) => {
            const value = formatStartTimeInput(event.target.value);
            setDisplay({ time: value, period: display.period });
            field.onChange(to24HourStartTime(value, display.period));
          }}
          onBlur={() => commitTime(display.time)}
        />
        <SPeriods role='group' aria-label='오전·오후 선택'>
          {TIME_PERIODS.map((value) => (
            <SPeriodButton
              key={value}
              type='button'
              size='medium'
              variant={display.period === value ? 'primary' : 'secondary'}
              aria-pressed={display.period === value}
              onClick={() => commitTime(getStartTimeDisplay(field.value).time, value)}
            >
              {value === 'AM' ? '오전' : '오후'}
            </SPeriodButton>
          ))}
        </SPeriods>
      </SControls>
    </STimeField>
  );
};

export default StartTimeField;

const STimeField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s10,
  width: '100%',
  maxWidth: 469,
});

const SControls = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.s8,
});

const STimeInput = styled(TextField, {
  flex: 1,
  minWidth: 0,
});

const SPeriods = styled('div', {
  display: 'flex',
  gap: spacing.s6,
  flexShrink: 0,
});

const SPeriodButton = styled(ActionButton, {
  minWidth: 60,
});

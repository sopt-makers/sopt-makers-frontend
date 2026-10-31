import CalendarInputForm from '@shared/form/Calendar';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconCalendarOutlined } from '@sopt-mds/icons';
import { formatDateInput } from '@util/date';
import type { ComponentProps } from 'react';
import { useController } from 'react-hook-form';
import { styled } from 'stitches.config';

import type { SettlementFormValues } from '../../schema';
import { SError, SLabel, SRequired } from '../style';

interface DiningDateFieldProps {
  allowPast: boolean;
}

const NON_DIGIT_REGEX = /\D/g;

const DiningDateField = ({ allowPast }: DiningDateFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useController<SettlementFormValues, 'diningDate'>({ name: 'diningDate' });

  const handleDateChange: ComponentProps<typeof CalendarInputForm>['setSelectedDate'] = (nextValue) => {
    const selectedDate = typeof nextValue === 'function' ? nextValue([field.value, '']) : nextValue;
    const diningDate = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;

    field.onChange(diningDate ?? '');
    field.onBlur();
  };

  return (
    <SDateField>
      <SLabel htmlFor='settlement-dining-date'>
        회식 일자 <SRequired aria-hidden>*</SRequired>
      </SLabel>
      <SInputGroup>
        <CalendarInputForm
          selectedDate={[field.value, '']}
          setSelectedDate={handleDateChange}
          selectedDateFieldName={field.name}
          dateType='singleSelect'
          allowPast={allowPast}
          renderInput={({ openCalendar, isOpen }) => (
            <SInputContainer data-error={Boolean(error)} onClick={openCalendar}>
              <SInput
                {...field}
                id='settlement-dining-date'
                placeholder='YYYY.MM.DD'
                inputMode='numeric'
                autoComplete='off'
                maxLength={10}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'settlement-dining-date-error' : undefined}
                onChange={(event) => field.onChange(formatDateInput(event.target.value.replace(NON_DIGIT_REGEX, '')))}
              />
              <SInputIconButton type='button' aria-label='회식 일자 선택' aria-expanded={isOpen} aria-haspopup='dialog'>
                <IconCalendarOutlined width={20} height={20} aria-hidden focusable='false' />
              </SInputIconButton>
            </SInputContainer>
          )}
        />
        {error && <SError id='settlement-dining-date-error'>{error.message}</SError>}
      </SInputGroup>
    </SDateField>
  );
};

export default DiningDateField;

const SDateField = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s10,
  'width': 335,
  '@mobile': { width: '100%' },
});

const SInputGroup = styled('div', { position: 'relative' });

const SInputContainer = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s14,
  'paddingInline': spacing.s16,
  'borderRadius': radius.r10,
  'backgroundColor': colors.bg.layer.default,
  'outline': '1px solid transparent',
  '&:focus-within': { outlineColor: colors.stroke.neutral.defaultFocused },
  '&[data-error=true]': { outlineColor: colors.fg.danger.default },
});

const SInput = styled('input', {
  ...typography.body1,
  'width': '100%',
  'minWidth': 0,
  'padding': `${spacing.s10} 0`,
  'background': 'transparent',
  'color': colors.fg.neutral.bold,
  'caretColor': colors.fg.brand.default,
  '&::placeholder': { color: colors.fg.neutral.ghost, opacity: 1 },
});

const SInputIconButton = styled('button', {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'flexShrink': 0,
  'width': 20,
  'height': 46,
  'color': colors.fg.neutral.default,
  '&:focus-visible': { outline: `2px solid ${colors.stroke.neutral.defaultFocused}` },
});

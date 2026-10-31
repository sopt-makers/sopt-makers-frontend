import { PART_NAME, PART_VALUES } from '@constant/option';
import { spacing } from '@sopt-mds/design-tokens';
import { Chip } from '@sopt-mds/ui';
import { useController } from 'react-hook-form';
import { styled } from 'stitches.config';

import type { SettlementFormValues } from '../../schema';
import { SDescription, SError, SFieldHeader, SLabel, SRequired } from '../style';

const JoinablePartsField = () => {
  const {
    field,
    fieldState: { error },
  } = useController<SettlementFormValues, 'joinableParts'>({ name: 'joinableParts' });
  const allSelected = PART_VALUES.every((part) => field.value.includes(part));

  return (
    <SPartsField
      role='group'
      aria-labelledby='settlement-parts-label'
      aria-describedby={error ? 'settlement-parts-error' : undefined}
    >
      <SFieldHeader>
        <SLabel as='div' id='settlement-parts-label'>
          참여 파트 <SRequired aria-hidden>*</SRequired>
        </SLabel>
        <SDescription>복수선택 가능합니다.</SDescription>
      </SFieldHeader>
      <div>
        <SChips>
          <Chip.Toggle
            size='medium'
            checked={allSelected}
            onBlur={field.onBlur}
            onCheckedChange={(checked) => field.onChange(checked ? [...PART_VALUES] : [])}
          >
            전체 파트
          </Chip.Toggle>
          {PART_VALUES.map((part, index) => (
            <Chip.Toggle
              key={part}
              ref={index === 0 ? field.ref : undefined}
              size='medium'
              name={field.name}
              checked={field.value.includes(part)}
              onBlur={field.onBlur}
              onCheckedChange={(checked) =>
                field.onChange(checked ? [...field.value, part] : field.value.filter((value) => value !== part))
              }
            >
              {PART_NAME[part]}
            </Chip.Toggle>
          ))}
        </SChips>
        {error && (
          <SError id='settlement-parts-error' css={{ marginTop: spacing.s8 }}>
            {error.message}
          </SError>
        )}
      </div>
    </SPartsField>
  );
};

export default JoinablePartsField;

const SPartsField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s12,
});

const SChips = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.s8,
});

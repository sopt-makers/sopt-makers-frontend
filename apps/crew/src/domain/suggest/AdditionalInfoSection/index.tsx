import { participationIntensityOptions, participationMethodOptions } from '@data/options';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { Chip } from '@sopt-mds/ui';
import { useController, useFormContext } from 'react-hook-form';
import { styled } from 'stitches.config';

import FormSection from '../FormSection';
import type { SuggestFormValues } from '../schema';

const AdditionalInfoSection = () => {
  const { control } = useFormContext<SuggestFormValues>();
  const { field: meetingTypeField } = useController({ control, name: 'joinInfo.meetingType' });
  const { field: meetingFrequencyField } = useController({ control, name: 'joinInfo.meetingFrequency' });

  return (
    <FormSection order={2} title='추가 정보' optional>
      <SField>
        <SFieldTitle>원하는 방식</SFieldTitle>
        <SHelpMessage>원하는 진행 방식과 참여 강도를 선택해주세요.</SHelpMessage>
        <SOptionGroup>
          <SOptionLabel>참여 방식</SOptionLabel>
          <SChipList>
            {participationMethodOptions.map((option) => (
              <Chip.Toggle
                key={option.value}
                size='small'
                checked={meetingTypeField.value === option.value}
                onCheckedChange={(checked) => meetingTypeField.onChange(checked ? option.value : undefined)}
              >
                {option.label}
              </Chip.Toggle>
            ))}
          </SChipList>
        </SOptionGroup>
        <SOptionGroup>
          <SOptionLabel>참여 강도</SOptionLabel>
          <SChipList>
            {participationIntensityOptions.map((option) => (
              <Chip.Toggle
                key={option.value}
                size='small'
                checked={meetingFrequencyField.value === option.value}
                onCheckedChange={(checked) => meetingFrequencyField.onChange(checked ? option.value : undefined)}
              >
                {option.label}
              </Chip.Toggle>
            ))}
          </SChipList>
        </SOptionGroup>
      </SField>
    </FormSection>
  );
};

export default AdditionalInfoSection;

const SField = styled('div', {
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const SFieldTitle = styled('p', {
  margin: `0 0 ${spacing.s4}`,
  color: colors.fg.neutral.bold,
  ...typography.title5,
});

const SHelpMessage = styled('span', {
  ...typography.label3,
  marginBottom: spacing.s12,
  color: colors.fg.neutral.subtle,
});

const SOptionGroup = styled('div', {
  '& + &': {
    marginTop: spacing.s20,
  },
});

const SOptionLabel = styled('p', {
  ...typography.label4,
  margin: `0 0 ${spacing.s8}`,
  color: colors.fg.neutral.default,
});

const SChipList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.s6,
});

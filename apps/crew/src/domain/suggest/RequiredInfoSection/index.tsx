import { keywordOptions } from '@data/options';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { Chip } from '@sopt-mds/ui';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { styled } from 'stitches.config';

import FormSection from '../FormSection';
import type { SuggestFormValues } from '../schema';

const MAX_TOPIC_COUNT = 2;
const TEXTAREA_MIN_HEIGHT = 164;

const RequiredInfoSection = () => {
  const { control } = useFormContext<SuggestFormValues>();
  const { field: titleField } = useController({ control, name: 'title' });
  const { field: expectationField } = useController({ control, name: 'expectation' });
  const { field: topicsField } = useController({ control, name: 'topics' });

  const handleTopicChange = (topic: string, checked: boolean) => {
    if (!checked) {
      topicsField.onChange(topicsField.value.filter((selectedTopic) => selectedTopic !== topic));
      return;
    }

    if (topicsField.value.length < MAX_TOPIC_COUNT) {
      topicsField.onChange([...topicsField.value, topic]);
    }
  };

  const handleExpectationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;

    textarea.style.height = 'auto';
    const borderHeight = textarea.offsetHeight - textarea.clientHeight;
    const contentHeight = textarea.scrollHeight + borderHeight;
    textarea.style.height = `${Math.max(contentHeight, TEXTAREA_MIN_HEIGHT)}px`;
    expectationField.onChange(event);
  };

  const isTopicSelected = (topic: string) => topicsField.value.includes(topic);

  return (
    <FormSection order={1} title='필수 정보'>
      <SFieldGroup>
        <SField>
          <SLabel>
            원하는 모임 <SRequired>*</SRequired>
          </SLabel>
          <SHelpMessage>기다리는 모임을 한 줄로 적어주세요.</SHelpMessage>
          <SInput {...titleField} type='text' placeholder='ex. 주 1회 같이 달리는 러닝 모임' maxLength={30} />
          <SCharacterCount>{titleField.value.length}/30</SCharacterCount>
        </SField>

        <SField>
          <SLabel>
            기대하는 내용 <SRequired>*</SRequired>
          </SLabel>
          <SHelpMessage>기대하는 모임에 대해 자유롭게 작성해주세요.</SHelpMessage>
          <STextarea
            {...expectationField}
            placeholder={'ex.\n러닝을 처음 시작한 사람들도 부담 없이 참여하는 러닝 모임 만들어주세요~'}
            maxLength={1000}
            onChange={handleExpectationChange}
          />
          <SCharacterCount>{expectationField.value.length}/1000</SCharacterCount>
        </SField>

        <SField>
          <SLabel>
            원하는 주제 <SRequired>*</SRequired>
          </SLabel>
          <SHelpMessage>최대 {MAX_TOPIC_COUNT}개까지 선택할 수 있어요.</SHelpMessage>
          <SChipList>
            {keywordOptions.map((option) => (
              <Chip.Toggle
                key={option.value}
                size='small'
                checked={isTopicSelected(option.value)}
                onCheckedChange={(checked) => handleTopicChange(option.value, checked)}
              >
                {option.label}
              </Chip.Toggle>
            ))}
          </SChipList>
        </SField>
      </SFieldGroup>
    </FormSection>
  );
};

export default RequiredInfoSection;

const SFieldGroup = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s64,
  '@mobile': {
    gap: spacing.s48,
  },
});

const SField = styled('div', {
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const SLabel = styled('span', {
  'display': 'flex',
  'gap': spacing.s4,
  'marginBottom': spacing.s4,
  'color': colors.fg.neutral.bold,
  ...typography.title3,

  '@mobile': {
    ...typography.title4,
  },
});

const SHelpMessage = styled('span', {
  ...typography.label3,
  marginBottom: spacing.s12,
  color: colors.fg.neutral.subtle,
});

const SRequired = styled('span', {
  color: colors.fg.brand.default,
});

const SInput = styled('input', {
  ...typography.title4,
  'boxSizing': 'border-box',
  'width': '100%',
  'padding': `${spacing.s10} ${spacing.s16}`,
  'color': colors.fg.neutral.bold,
  'border': `1px solid ${colors.stroke.neutral.ghost}`,
  'borderRadius': radius.r10,
  'outline': 0,
  'backgroundColor': colors.bg.neutral.ghost,

  '&::placeholder': {
    color: colors.fg.neutral.ghost,
    opacity: 1,
  },

  '&:focus': {
    borderColor: colors.stroke.neutral.defaultFocused,
  },
});

const STextarea = styled('textarea', {
  ...typography.body2,
  'boxSizing': 'border-box',
  'width': '100%',
  'minHeight': `${TEXTAREA_MIN_HEIGHT}px`,
  'padding': spacing.s16,
  'color': colors.fg.neutral.bold,
  'border': `1px solid ${colors.stroke.neutral.ghost}`,
  'borderRadius': radius.r10,
  'outline': 0,
  'resize': 'none',
  'overflow': 'hidden',
  'backgroundColor': colors.bg.neutral.ghost,

  '&::placeholder': {
    color: colors.fg.neutral.ghost,
    opacity: 1,
  },

  '&:focus': {
    borderColor: colors.stroke.neutral.defaultFocused,
  },
});

const SCharacterCount = styled('span', {
  ...typography.body2,
  alignSelf: 'flex-end',
  marginTop: spacing.s6,
  color: colors.fg.neutral.ghost,
});

const SChipList = styled('div', {
  'display': 'flex',
  'flexWrap': 'wrap',
  'gap': spacing.s6,
  'marginBottom': spacing.s72,

  '@mobile': {
    marginBottom: spacing.s32,
  },
});

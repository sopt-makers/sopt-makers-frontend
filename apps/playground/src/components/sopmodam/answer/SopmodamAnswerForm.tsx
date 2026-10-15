import styled from '@emotion/styled';
import { TextArea } from '@sopt-makers/ui';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { useId } from 'react';

import { MAX_SOPMODAM_ANSWER_LENGTH, SopmodamAnswerContentSchema } from '@/api/endpoint/sopmodam/answerSchemas';
import SopmodamAnswerNotice from '@/components/sopmodam/answer/SopmodamAnswerNotice';
import type { SopmodamAnswerFormState } from '@/components/sopmodam/answer/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamAnswerFormProps {
  form: SopmodamAnswerFormState;
  canEdit: boolean;
  releaseDate: string;
  isSubmitting: boolean;
  onChange: (content: string) => void;
  onSubmit: () => void;
}

const ANSWER_LENGTH_ERROR_MESSAGE = `${MAX_SOPMODAM_ANSWER_LENGTH}자 이내로 입력해주세요.`;

const SopmodamAnswerForm = ({
  form,
  canEdit,
  releaseDate,
  isSubmitting,
  onChange,
  onSubmit,
}: SopmodamAnswerFormProps) => {
  const id = useId();
  const { content } = form;
  const isEditing = form.type === 'update';
  const isOverLimit = content.length > MAX_SOPMODAM_ANSWER_LENGTH;
  const isValid = SopmodamAnswerContentSchema.safeParse(content).success;
  const isChanged = form.type === 'create' || content !== form.originalContent;
  const isLocked = !canEdit || isSubmitting;
  const canSubmit = isValid && !isLocked && isChanged;

  return (
    <form
      aria-busy={isSubmitting}
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit) {
          onSubmit();
        }
      }}
    >
      <Fields disabled={isLocked}>
        <Input>
          <InputArea
            value={content}
            onChange={(event) => onChange(event.target.value)}
            aria-label='경험담'
            aria-describedby={`${id}-count${isOverLimit ? ` ${id}-error` : ''}`}
            aria-invalid={isOverLimit}
            placeholder='먼저 경험한 솝트인으로서 나누고 싶은 경험을 편하게 담아주세요.'
            isError={isOverLimit}
            errorMessage={ANSWER_LENGTH_ERROR_MESSAGE}
            fixedHeight={148}
            maxHeight={148}
            disableEnterSubmit
            disabled={isLocked}
          />
          {isOverLimit && (
            <span id={`${id}-error`} hidden>
              {ANSWER_LENGTH_ERROR_MESSAGE}
            </span>
          )}
          <Count id={`${id}-count`} isError={isOverLimit}>
            {content.length}/{MAX_SOPMODAM_ANSWER_LENGTH}
          </Count>
        </Input>
        <SubmitButton type='submit' variant='primary' size='large' disabled={!canSubmit}>
          {isEditing ? '수정 완료' : '내 경험 담기'}
        </SubmitButton>
        <Notice>
          <SopmodamAnswerNotice releaseDate={releaseDate} />
        </Notice>
      </Fields>
    </form>
  );
};

export default SopmodamAnswerForm;

const Fields = styled.fieldset`
  display: grid;
  grid-template-areas:
    'input'
    'notice'
    'action';
  gap: ${spacing.s16};
  margin: 0;
  border: 0;
  padding: 0;
  min-width: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-areas:
      'input'
      'action'
      'notice';
  }
`;

const Input = styled.div`
  position: relative;
  grid-area: input;
  min-height: 196px;

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: 176px;
  }
`;

const InputArea = styled(TextArea)`
  /* MDS 입력 박스의 padding과 border(22px)를 포함해 PC 170px, 모바일 150px로 맞춥니다. */
  & textarea {
    ${typography.body1};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    & textarea {
      /* MDS fixedHeight/maxHeight의 inline style보다 모바일 높이를 우선 적용합니다. */
      height: 128px !important;
      max-height: 128px !important;
    }
  }
`;

const Count = styled.p<{ isError: boolean }>`
  ${typography.body3};

  position: absolute;
  right: ${spacing.s2};
  bottom: 0;
  color: ${({ isError }) => (isError ? colors.fg.danger.default : colors.fg.neutral.ghost)};
`;

const SubmitButton = styled(ActionButton)`
  ${typography.label1};

  grid-area: action;
  justify-self: end;
  border-radius: ${radius.r12};
  padding: 0 26px;
  height: 56px;

  &:focus-visible {
    outline: 2px solid ${colors.stroke.neutral.defaultFocused};
    outline-offset: 2px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.label2};

    border-radius: ${radius.r10};
    padding: 0 ${spacing.s16};
    width: 100%;
    height: 46px;
  }
`;

const Notice = styled.div`
  grid-area: notice;
  margin-top: ${spacing.s8};
`;

import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconInfoCircleOutlined } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';
import { useId, useState } from 'react';

import TextArea from '@/components/common/TextArea';
import SopmodamAnswerNotice from '@/components/sopmodam/answer/SopmodamAnswerNotice';
import type { SopmodamAnswerStatus } from '@/components/sopmodam/answer/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamAnswerFormProps {
  status: Extract<SopmodamAnswerStatus, { type: 'available' | 'unavailable' | 'editable' }>;
  releaseDate: string;
  isSubmitting: boolean;
  onSubmit: (content: string) => Promise<void> | void;
}

const MAX_ANSWER_LENGTH = 500;

const SopmodamAnswerForm = ({ status, releaseDate, isSubmitting, onSubmit }: SopmodamAnswerFormProps) => {
  const id = useId();
  const isEditing = status.type === 'editable';
  const initialContent = isEditing ? status.answer.content : '';
  const [content, setContent] = useState(initialContent);
  // 폼을 열었을 때의 내용을 기준으로 비교해, 재조회가 작성 중인 내용을 덮어쓰지 않도록 합니다.
  const [originalContent] = useState(initialContent);
  const isOverLimit = content.length > MAX_ANSWER_LENGTH;
  const isValid = content.trim().length > 0 && !isOverLimit;
  const isChanged = content !== originalContent;
  const isLocked = status.type === 'unavailable' || isSubmitting;
  const canSubmit = isValid && !isLocked && (!isEditing || isChanged);

  return (
    <form
      aria-busy={isSubmitting}
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit) {
          void onSubmit(content);
        }
      }}
    >
      <Fields disabled={isLocked}>
        <Input>
          <InputArea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            aria-label='경험담'
            aria-describedby={`${id}-count${isOverLimit ? ` ${id}-error` : ''}`}
            aria-invalid={isOverLimit}
            placeholder='먼저 경험한 솝트인으로서 나누고 싶은 경험을 편하게 담아주세요.'
            error={isOverLimit}
            disabled={isLocked}
          />
          <Helper>
            {isOverLimit && (
              <ErrorMessage id={`${id}-error`}>
                <IconInfoCircleOutlined width={14} height={14} aria-hidden='true' focusable='false' />
                {MAX_ANSWER_LENGTH}자 이내로 입력해주세요.
              </ErrorMessage>
            )}
            <Count id={`${id}-count`} isError={isOverLimit}>
              {content.length}/{MAX_ANSWER_LENGTH}
            </Count>
          </Helper>
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
  display: flex;
  flex-direction: column;
  grid-area: input;
  gap: ${spacing.s6};
`;

const InputArea = styled(TextArea)`
  ${typography.body1};

  margin: 0;
  border: 1px solid ${({ error }) => (error ? colors.stroke.danger.default : 'transparent')};
  border-radius: ${radius.r10};
  box-shadow: none;
  background-color: ${colors.bg.layer.default};
  padding: ${spacing.s10} ${spacing.s16};
  width: 100%;
  height: 170px;
  overflow-y: auto;
  resize: none;
  color: ${colors.fg.neutral.bold};

  &::placeholder {
    color: ${colors.fg.neutral.ghost};
  }

  &:focus {
    border-color: ${({ error }) => (error ? colors.stroke.danger.default : colors.stroke.neutral.defaultFocused)};
    background-color: ${colors.bg.layer.default};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    height: 150px;
  }
`;

const Helper = styled.div`
  display: flex;
  gap: ${spacing.s8};
  align-items: center;
  justify-content: space-between;
  padding: 0 ${spacing.s2};
  height: 16px;
`;

const ErrorMessage = styled.p`
  ${typography.body3};

  display: flex;
  gap: ${spacing.s4};
  align-items: center;
  color: ${colors.fg.danger.default};

  & > svg {
    flex-shrink: 0;
  }
`;

const Count = styled.p<{ isError: boolean }>`
  ${typography.body3};

  flex-shrink: 0;
  margin-left: auto;
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

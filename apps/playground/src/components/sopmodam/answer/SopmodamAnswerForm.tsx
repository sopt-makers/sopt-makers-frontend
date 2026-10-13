import styled from '@emotion/styled';
import { TextArea } from '@sopt-makers/ui';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconInfoCircleOutlined } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';
import { useId, useRef, useState } from 'react';

import SopmodamAnswerNotice from '@/components/sopmodam/answer/SopmodamAnswerNotice';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamAnswerFormProps {
  initialContent: string;
  mode: 'create' | 'edit';
  releaseDate: string;
  canWrite: boolean;
  isSubmitting: boolean;
  onSubmit: (content: string) => Promise<void> | void;
}

const MAX_ANSWER_LENGTH = 500;

const SopmodamAnswerForm = ({
  initialContent,
  mode,
  releaseDate,
  canWrite,
  isSubmitting,
  onSubmit,
}: SopmodamAnswerFormProps) => {
  const id = useId();
  const [content, setContent] = useState(initialContent);
  // 폼을 열었을 때의 내용을 기준으로 비교해, 재조회가 작성 중인 내용을 덮어쓰지 않도록 합니다.
  const originalContent = useRef(initialContent);
  const isOverLimit = content.length > MAX_ANSWER_LENGTH;
  const isValid = content.trim().length > 0 && !isOverLimit;
  const isChanged = content !== originalContent.current;
  const isLocked = !canWrite || isSubmitting;
  const canSubmit = isValid && !isLocked && (mode === 'create' || isChanged);

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
            isError={isOverLimit}
            fixedHeight={170}
            maxHeight={170}
            disableEnterSubmit
            disabled={isLocked}
          />
          <Helper>
            {isOverLimit && (
              <ErrorMessage id={`${id}-error`}>
                <IconInfoCircleOutlined width={14} height={14} aria-hidden='true' focusable='false' />
                500자 이내로 입력해주세요.
              </ErrorMessage>
            )}
            <Count id={`${id}-count`} isError={isOverLimit}>
              {content.length}/{MAX_ANSWER_LENGTH}
            </Count>
          </Helper>
        </Input>
        <SubmitButton type='submit' variant='primary' size='large' disabled={!canSubmit}>
          {mode === 'edit' ? '수정 완료' : '내 경험 담기'}
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
  width: 100%;

  /* 사용하지 않는 상단 addon과 MDS 자체 helper 대신 같은 입력값으로 계산한 helper를 사용합니다. */
  & > div:first-of-type,
  & > div:nth-of-type(3) {
    display: none;
  }

  & > div:nth-of-type(2) {
    border: 1px solid ${({ isError }) => (isError ? colors.stroke.danger.default : 'transparent')};
    border-radius: ${radius.r10};
    box-shadow: none;
    background-color: ${colors.bg.layer.default};
    padding: ${spacing.s10} ${spacing.s16};
    height: 170px;

    &:focus-within {
      border-color: ${({ isError }) => (isError ? colors.stroke.danger.default : colors.stroke.neutral.defaultFocused)};
    }
  }

  & textarea {
    ${typography.body1};

    margin: 0;
    border: 0;
    background: transparent;
    padding: 0;
    width: 100%;
    height: 100% !important;
    max-height: none !important;
    overflow-y: auto;
    resize: none;
    color: ${colors.fg.neutral.bold};

    &::placeholder {
      color: ${colors.fg.neutral.ghost};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    & > div:nth-of-type(2) {
      height: 150px;
    }
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

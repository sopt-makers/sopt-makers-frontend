import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { useId } from 'react';

import SopmodamVoteOption from '@/components/sopmodam/vote/SopmodamVoteOption';
import type { SopmodamVoteState } from '@/components/sopmodam/vote/types';
import CheckSquareIcon from '@/public/icons/icon-sopmodam-check-square.svg';

interface SopmodamVoteSectionProps extends SopmodamVoteState {
  selectedQuestionId: number | null;
  isSubmitting: boolean;
  onSelect: (questionId: number) => void;
  onSubmit: (questionId: number) => void;
}

const SopmodamVoteSection = ({
  questions,
  canVote,
  hasVoted,
  myVoteQuestionId,
  selectedQuestionId,
  isSubmitting,
  onSelect,
  onSubmit,
}: SopmodamVoteSectionProps) => {
  const id = useId();
  const isLocked = hasVoted || !canVote || isSubmitting;
  const checkedQuestionId = hasVoted ? myVoteQuestionId : selectedQuestionId;
  const hasSelection = questions.some((question) => question.questionId === checkedQuestionId);
  const canSubmit = !isLocked && hasSelection;
  const buttonLabel = hasVoted ? '투표 완료' : '투표하기';

  return (
    <Container
      aria-busy={isSubmitting}
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit && selectedQuestionId !== null) {
          onSubmit(selectedQuestionId);
        }
      }}
    >
      <Options disabled={isLocked} aria-describedby={`${id}-guidance`}>
        <Title>
          <CheckSquareIcon aria-hidden='true' focusable='false' />
          투표
        </Title>
        <OptionList>
          {questions.map((question) => (
            <SopmodamVoteOption
              key={question.questionId}
              question={question}
              name={`${id}-question`}
              checked={question.questionId === checkedQuestionId}
              disabled={isLocked}
              onSelect={onSelect}
            />
          ))}
        </OptionList>
      </Options>
      <Footer>
        <SubmitButton type='submit' variant='primary' size='small' disabled={!canSubmit}>
          <span aria-live='polite'>{buttonLabel}</span>
        </SubmitButton>
        <Guidance id={`${id}-guidance`}>1개 선택 가능 ∙ 투표 후 수정 불가</Guidance>
      </Footer>
    </Container>
  );
};

export default SopmodamVoteSection;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s16};
  border-radius: ${radius.r12};
  background-color: ${colors.bg.layer.default};
  padding: ${spacing.s16};
`;

const Options = styled.fieldset`
  margin: 0;
  border: 0;
  padding: 0;
  min-width: 0;
`;

const Title = styled.legend`
  ${typography.label3};

  display: flex;
  gap: ${spacing.s8};
  align-items: center;
  margin-bottom: ${spacing.s16};
  color: ${colors.fg.neutral.bold};
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
`;

const SubmitButton = styled(ActionButton)`
  width: 100%;
  height: 38px;
  color: ${colors.fg.neutral.defaultDisabled};

  &:focus-visible {
    outline: 2px solid ${colors.stroke.neutral.defaultFocused};
    outline-offset: 2px;
  }
`;

const Guidance = styled.p`
  ${typography.label4};

  color: ${colors.fg.neutral.subtle};
`;

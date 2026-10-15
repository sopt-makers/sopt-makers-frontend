import { isAxiosError } from 'axios';
import { useRef } from 'react';

import type { SopmodamQuestionsResponse } from '@/api/endpoint/sopmodam/getSopmodamQuestions';
import { usePostSopmodamVoteMutation } from '@/api/endpoint/sopmodam/postSopmodamVote';

interface UseSubmitSopmodamVoteOptions {
  roundId: number;
  data: Pick<SopmodamQuestionsResponse, 'dDay' | 'canVote' | 'hasVoted' | 'questions'> | null;
}

export const useSubmitSopmodamVote = ({ roundId, data }: UseSubmitSopmodamVoteOptions) => {
  const { mutateAsync, isPending: isSubmitting, error, variables } = usePostSopmodamVoteMutation();
  // isPending이 다음 렌더링에 반영되기 전 연속 호출도 즉시 차단합니다.
  const submittingRef = useRef(false);

  const submitVote = async (questionId: number): Promise<void> => {
    if (data === null) {
      return;
    }

    const isValidQuestion = data.questions.some((question) => question.questionId === questionId);
    const canSubmit = data.dDay !== null && data.canVote && !data.hasVoted && isValidQuestion;
    if (!canSubmit || isSubmitting || submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    try {
      await mutateAsync({ roundId, questionId });
    } catch {
      // 실패 복구는 mutation의 onError에서 처리합니다.
    } finally {
      submittingRef.current = false;
    }
  };

  const isVoteConflictUnresolved =
    data !== null &&
    !isSubmitting &&
    variables?.roundId === roundId &&
    isAxiosError(error) &&
    error.response?.status === 409 &&
    !data.hasVoted;

  return { submitVote, isSubmitting, isVoteConflictUnresolved };
};

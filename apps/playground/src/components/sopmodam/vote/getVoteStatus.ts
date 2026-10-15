import type { SopmodamQuestionsResponse } from '@/api/endpoint/sopmodam/getSopmodamQuestions';
import type { SopmodamVoteStatus } from '@/components/sopmodam/vote/types';

type VoteStatusInput = Pick<SopmodamQuestionsResponse, 'canVote' | 'hasVoted' | 'myVoteQuestionId'>;

export const getVoteStatus = ({ canVote, hasVoted, myVoteQuestionId }: VoteStatusInput): SopmodamVoteStatus => {
  if (hasVoted) {
    if (myVoteQuestionId === null) {
      throw new Error('투표 완료 상태에는 투표한 질문 ID가 필요합니다.');
    }

    return { type: 'voted', questionId: myVoteQuestionId };
  }

  return { type: canVote ? 'available' : 'unavailable' };
};

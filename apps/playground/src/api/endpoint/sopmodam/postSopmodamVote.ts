import type { QueryClient } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import type { SopmodamQuestionsQueryResult } from '@/api/endpoint/sopmodam/getSopmodamQuestions';
import { getSopmodamQuestions } from '@/api/endpoint/sopmodam/getSopmodamQuestions';
import { createEndpoint } from '@/api/typedAxios';

interface SopmodamVoteRequest {
  roundId: number;
  questionId: number;
}

const VoteResponseSchema = z.object({
  roundId: z.number().int().positive(),
  questionId: z.number().int().positive(),
});

export const postSopmodamVote = createEndpoint({
  request: ({ roundId, questionId }: SopmodamVoteRequest) => ({
    method: 'POST',
    url: `api/v1/sopmodam/rounds/${roundId}/votes`,
    data: { questionId },
  }),
  serverResponseScheme: VoteResponseSchema,
});

export const usePostSopmodamVoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: SopmodamVoteRequest) => {
      const response = VoteResponseSchema.parse(await postSopmodamVote.request(request));
      if (response.roundId !== request.roundId || response.questionId !== request.questionId) {
        throw new Error('요청한 투표와 등록된 투표가 일치하지 않습니다.');
      }
      return response;
    },
    onSuccess: async (response, { roundId }) => {
      await syncConfirmedVote(queryClient, roundId, response.questionId);
    },
    onError: async (_error, { roundId }) => {
      // 등록 응답만 유실됐을 수 있으므로 서버 상태를 다시 확인합니다.
      await refetchVoteState(queryClient, roundId);
    },
  });
};

const syncConfirmedVote = async (queryClient: QueryClient, roundId: number, questionId: number) => {
  const queryKey = getSopmodamQuestions.cacheKey(roundId);
  // 이전 조회 응답이 완료 상태를 덮어쓰지 않도록 먼저 취소합니다.
  await queryClient.cancelQueries({ queryKey, exact: true });
  // 재조회가 실패해도 POST로 확인된 완료 상태는 유지합니다.
  queryClient.setQueryData<SopmodamQuestionsQueryResult>(queryKey, (previous) =>
    previous?.type === 'success'
      ? { ...previous, data: { ...previous.data, canVote: false, hasVoted: true, myVoteQuestionId: questionId } }
      : previous,
  );
  await refetchVoteState(queryClient, roundId);
};

const refetchVoteState = async (queryClient: QueryClient, roundId: number) => {
  const queryKey = getSopmodamQuestions.cacheKey(roundId);
  await queryClient.invalidateQueries({ queryKey, exact: true, refetchType: 'all' });
};

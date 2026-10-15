import { useSuspenseQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const MAX_REFETCH_INTERVAL = 2_147_483_647;
const VOTE_STATUS_RECHECK_INTERVAL = 30_000;

const getVoteEndTime = (voteEndAt: string) =>
  Date.parse(/(?:Z|[+-]\d{2}:\d{2})$/i.test(voteEndAt) ? voteEndAt : `${voteEndAt}+09:00`);

const QuestionsResponseSchema = z
  .object({
    roundId: z.number().int().positive(),
    eventName: z.string(),
    voteEndAt: z.string().refine((value) => Number.isFinite(getVoteEndTime(value))),
    dDay: z.number().int().nonnegative().nullable(),
    canVote: z.boolean(),
    hasVoted: z.boolean(),
    myVoteQuestionId: z.number().int().positive().nullable(),
    questions: z.array(z.object({ questionId: z.number().int().positive(), content: z.string() })),
  })
  .refine(
    ({ hasVoted, myVoteQuestionId, canVote, questions }) =>
      hasVoted
        ? myVoteQuestionId !== null && !canVote && questions.some(({ questionId }) => questionId === myVoteQuestionId)
        : myVoteQuestionId === null,
    '투표 완료 여부와 투표한 질문 정보가 일치하지 않습니다.',
  )
  .refine(({ dDay, canVote }) => dDay !== null || !canVote, '종료된 투표에는 참여할 수 없습니다.');

export type SopmodamQuestionsResponse = z.infer<typeof QuestionsResponseSchema>;

export type SopmodamQuestionsQueryResult =
  | { type: 'success'; data: SopmodamQuestionsResponse }
  | { type: 'error'; statusCode: 400 | 403 | 404 };

export const getSopmodamQuestions = createEndpoint({
  request: (roundId: number, signal?: AbortSignal) => ({
    method: 'GET',
    url: `api/v1/sopmodam/rounds/${roundId}/questions`,
    signal,
  }),
  serverResponseScheme: QuestionsResponseSchema,
});

export const useGetSopmodamQuestionsSuspenseQuery = (roundId: number) => {
  return useSuspenseQuery({
    queryKey: getSopmodamQuestions.cacheKey(roundId),
    queryFn: async ({ signal }): Promise<SopmodamQuestionsQueryResult> => {
      try {
        const response = QuestionsResponseSchema.parse(await getSopmodamQuestions.request(roundId, signal));
        if (response.roundId !== roundId) {
          throw new Error('요청한 회차와 조회된 회차가 일치하지 않습니다.');
        }
        return { type: 'success', data: response };
      } catch (error) {
        const statusCode = isAxiosError(error) ? error.response?.status : undefined;
        if (statusCode === 400 || statusCode === 403 || statusCode === 404) {
          return { type: 'error', statusCode };
        }
        throw error;
      }
    },
    // 전역 5분 대신 Suspense의 최소 staleTime인 1초를 적용합니다.
    staleTime: 1_000,
    refetchOnWindowFocus: 'always',
    refetchInterval: (query) => {
      const result = query.state.data;
      if (!result || result.type === 'error' || result.data.dDay === null) {
        return false;
      }
      const response = result.data;

      const errorStatus = isAxiosError(query.state.error) ? query.state.error.response?.status : undefined;
      if (errorStatus !== undefined && errorStatus >= 400 && errorStatus < 500) {
        return false;
      }

      // 전역 재시도를 소진한 뒤에도 일시적인 조회 실패에서 복구할 수 있도록 재확인합니다.
      if (query.state.status === 'error') {
        return VOTE_STATUS_RECHECK_INTERVAL;
      }

      const remaining = getVoteEndTime(response.voteEndAt) - Date.now();
      // 클라이언트 시계가 빠르더라도 짧은 간격으로 요청을 반복하지 않고 서버의 종료 상태를 확인합니다.
      return remaining > 0 ? Math.min(remaining, MAX_REFETCH_INTERVAL) : VOTE_STATUS_RECHECK_INTERVAL;
    },
  });
};

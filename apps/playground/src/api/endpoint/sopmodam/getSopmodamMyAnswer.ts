import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import type { SopmodamMyAnswerResponse } from '@/api/endpoint/sopmodam/answerSchemas';
import { getSopmodamAnswerEndTime, SopmodamMyAnswerSchema } from '@/api/endpoint/sopmodam/answerSchemas';
import { createEndpoint } from '@/api/typedAxios';

const MAX_REFETCH_INTERVAL = 2_147_483_647;
const ANSWER_STATUS_RECHECK_INTERVAL = 30_000;

export type SopmodamMyAnswerQueryResult =
  | { type: 'success'; data: SopmodamMyAnswerResponse }
  | { type: 'error'; statusCode: 400 | 403 | 404 };

export const getSopmodamMyAnswer = createEndpoint({
  request: (roundId: number, signal?: AbortSignal) => ({
    method: 'GET',
    url: `api/v1/sopmodam/rounds/${roundId}/answers/me`,
    signal,
  }),
  serverResponseScheme: SopmodamMyAnswerSchema,
});

export const getSopmodamMyAnswerQueryOptions = (roundId: number) =>
  queryOptions({
    queryKey: getSopmodamMyAnswer.cacheKey(roundId),
    queryFn: async ({ signal }): Promise<SopmodamMyAnswerQueryResult> => {
      try {
        const response = SopmodamMyAnswerSchema.parse(await getSopmodamMyAnswer.request(roundId, signal));
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
    // 전역 5분 대신 Suspense의 최소 staleTime을 적용합니다.
    staleTime: 1_000,
    refetchOnWindowFocus: 'always',
    refetchInterval: (query) => {
      const result = query.state.data;
      if (!result || result.type === 'error' || !result.data.canEdit) {
        return false;
      }
      const errorStatus = isAxiosError(query.state.error) ? query.state.error.response?.status : undefined;
      if (errorStatus !== undefined && errorStatus >= 400 && errorStatus < 500) {
        return false;
      }
      if (query.state.status === 'error') {
        return ANSWER_STATUS_RECHECK_INTERVAL;
      }

      const remaining = getSopmodamAnswerEndTime(result.data.answerEndAt) - Date.now();
      // 클라이언트 시계만으로 마감하지 않고 서버의 canEdit을 다시 확인합니다.
      return remaining > 0 ? Math.min(remaining, MAX_REFETCH_INTERVAL) : ANSWER_STATUS_RECHECK_INTERVAL;
    },
  });

export const useGetSopmodamMyAnswerSuspenseQuery = (roundId: number) =>
  useSuspenseQuery(getSopmodamMyAnswerQueryOptions(roundId));

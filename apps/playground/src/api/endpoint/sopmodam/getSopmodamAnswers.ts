import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { SOPMODAM_ANSWERS_MOCK } from '@/components/sopmodam/answer/mock';

const sopmodamAnswerSchema = z.object({
  answerId: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  writer: z.object({
    memberId: z.number(),
    name: z.string(),
    profileImage: z.string().nullable(),
    generation: z.number(),
    part: z.string(),
  }),
});

const sopmodamAnswersResponseSchema = z.object({
  roundId: z.number(),
  eventName: z.string(),
  question: z.object({
    questionId: z.number(),
    content: z.string(),
  }),
  answerCount: z.number(),
  answers: z.array(sopmodamAnswerSchema),
});

const getSopmodamAnswersEndpoint = createEndpoint({
  request: (roundId: number) => ({
    method: 'GET',
    url: `api/v1/sopmodam/rounds/${roundId}/answers`,
  }),
  serverResponseScheme: sopmodamAnswersResponseSchema,
});

const MAX_RETRY_COUNT = 1;

export const useGetSopmodamAnswers = (roundId: number) => {
  return useQuery({
    queryKey: getSopmodamAnswersEndpoint.cacheKey(roundId),
    // TODO: API 연동 시 getSopmodamAnswersEndpoint.request(roundId)로 교체
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 2000));
      return SOPMODAM_ANSWERS_MOCK;
    },
    retry: (failureCount, error) => !isSopmodamAnswersUnavailableError(error) && failureCount < MAX_RETRY_COUNT,
  });
};

const UNAVAILABLE_STATUSES = [
  400, // 아직 공개 전
  404, // 회차 없음
];

// 재시도해도 결과가 같으므로 재시도하지 않고, 화면에서는 에러 페이지로 처리
export const isSopmodamAnswersUnavailableError = (error: unknown) =>
  isAxiosError(error) && UNAVAILABLE_STATUSES.includes(error.response?.status ?? 0);

export type SopmodamAnswer = z.infer<typeof sopmodamAnswerSchema>;
export type SopmodamAnswersResponse = z.infer<typeof sopmodamAnswersResponseSchema>;

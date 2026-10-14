import { useQuery } from '@tanstack/react-query';
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

export const useGetSopmodamAnswers = (roundId: number) => {
  return useQuery({
    queryKey: getSopmodamAnswersEndpoint.cacheKey(roundId),
    // TODO: API 연동 시 getSopmodamAnswersEndpoint.request(roundId)로 교체
    queryFn: async () => SOPMODAM_ANSWERS_MOCK,
  });
};

export type SopmodamAnswer = z.infer<typeof sopmodamAnswerSchema>;
export type SopmodamAnswersResponse = z.infer<typeof sopmodamAnswersResponseSchema>;

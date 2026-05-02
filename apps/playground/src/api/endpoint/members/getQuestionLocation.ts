import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const getQuestionLocationResponseScheme = z.object({
  questionId: z.number(),
  tab: z.enum(['answered', 'unanswered']),
  page: z.number(),
  index: z.number(),
});

export type GetQuestionLocationResponse = z.infer<typeof getQuestionLocationResponseScheme>;

interface GetQuestionLocationRequest {
  memberId: number;
  questionId: number;
}

export const getQuestionLocationEndpoint = createEndpoint({
  request: ({ memberId, questionId }: GetQuestionLocationRequest) => ({
    method: 'GET',
    url: `/api/v1/members/${memberId}/questions/${questionId}/location`,
  }),
  serverResponseScheme: getQuestionLocationResponseScheme,
});

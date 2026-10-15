import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const sopmodamCurrentSchema = z.object({
  roundId: z.number(),
  eventName: z.string(),
  phase: z.enum(['VOTING', 'ANSWERING', 'REVEALED']),
  cardType: z.enum(['VOTE', 'ANSWER_PREPARING', 'ANSWER_COLLECTING', 'REVEALED']),
  voteEndAt: z.string(),
  answerEndAt: z.string(),
  dDay: z.number().nullable(),
  selectedQuestion: z
    .object({
      questionId: z.number(),
      content: z.string(),
    })
    .nullable(),
  canVote: z.boolean(),
  hasVoted: z.boolean(),
  canAnswer: z.boolean(),
  hasAnswered: z.boolean(),
  answerCount: z.number().nullable(),
});

const getSopmodamCurrentEndpoint = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/sopmodam/current',
  },
  // 204(노출할 카드 없음)는 빈 body로 내려오므로 null로 변환
  serverResponseScheme: z.preprocess((data) => data || null, sopmodamCurrentSchema.nullable()),
});

export const sopmodamCurrentQueryOptions = {
  queryKey: getSopmodamCurrentEndpoint.cacheKey(),
  queryFn: () => getSopmodamCurrentEndpoint.request(),
  gcTime: 1000 * 60 * 30,
};

export const useGetSopmodamCurrent = () => {
  return useQuery(sopmodamCurrentQueryOptions);
};

export type SopmodamCurrent = z.infer<typeof sopmodamCurrentSchema>;

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import type { GetResponseType } from '@/api/typedAxios';
import { createEndpoint } from '@/api/typedAxios';

const getMembersQuestionsLatest = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/members/questions/latest',
  }),
  serverResponseScheme: z.object({
    questions: z.array(
      z.object({
        receiverId: z.number(),
        receiverName: z.string(),
        receiverProfileImage: z.string().nullable(),
        questionId: z.number(),
        content: z.string(),
        location: z.object({
          questionId: z.number(),
          tab: z.literal('answered'),
          page: z.number(),
          index: z.number(),
        }),
      }),
    ),
  }),
});

export const useGetMembersQuestionsLatest = () => {
  return useQuery({
    queryKey: ['getMembersQuestionsLatest'],
    queryFn: () => getMembersQuestionsLatest.request(),
  });
};

export type MembersQuestionType = GetResponseType<typeof getMembersQuestionsLatest>['questions'][number];

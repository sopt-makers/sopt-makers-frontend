import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const memberRecommendSchema = z.object({
  id: z.number(),
  name: z.string(),
  profileImage: z.string().nullable(),
  generation: z.number(),
  part: z.string(),
  recommendType: z.enum(['SAME_PART', 'SAME_CREW', 'SAME_MBTI', 'SAME_UNIVERSITY', 'SAME_GENERATION']),
});

const getMemberRecommendOfMeEndpoint = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/members/recommend/me',
  }),
  serverResponseScheme: z.object({
    members: z.array(memberRecommendSchema),
  }),
});

export const useGetMemberRecommendOfMe = () => {
  return useQuery({
    queryKey: getMemberRecommendOfMeEndpoint.cacheKey(),
    queryFn: () => getMemberRecommendOfMeEndpoint.request(),
    staleTime: Infinity,
  });
};

export type RecommendMemberOfMe = z.infer<typeof memberRecommendSchema>;

import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const memberRecommendSchema = z.object({
  id: z.number(),
  name: z.string(),
  profileImage: z.string().nullable(),
  generation: z.number(),
  part: z.string(),
  // TODO: 서버 작업 이후 SAME_MBTI 삭제
  recommendType: z.enum(['SAME_PART', 'SAME_CREW', 'SAME_PROJECT', 'SAME_MBTI', 'SAME_UNIVERSITY', 'SAME_GENERATION']),
});

const getMemberRecommendByIdEndpoint = createEndpoint({
  request: (userId: string) => ({
    method: 'GET',
    url: `api/v1/members/recommend/${userId}`,
  }),
  serverResponseScheme: z.object({
    members: z.array(memberRecommendSchema),
  }),
});

export const useGetMemberRecommendById = (userId: string) => {
  return useQuery({
    queryKey: getMemberRecommendByIdEndpoint.cacheKey(userId),
    queryFn: () => getMemberRecommendByIdEndpoint.request(userId),
    staleTime: Infinity,
  });
};

export type RecommendMemberById = z.infer<typeof memberRecommendSchema>;

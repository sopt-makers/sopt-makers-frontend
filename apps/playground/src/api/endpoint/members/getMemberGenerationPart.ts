import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const memberGenerationPartSchema = z.object({
  id: z.number(),
  name: z.string(),
  profileImage: z.string().nullable(),
  generation: z.number(),
  part: z.string(),
});

const getMemberGenerationPart = createEndpoint({
  request: (userId: string) => ({
    method: 'GET',
    url: `api/v1/members/recommend/${userId}/generation-part`,
  }),
  serverResponseScheme: z.object({
    members: z.array(memberGenerationPartSchema),
  }),
});

export const useGetMemberGenerationPart = (userId: string) => {
  return useQuery({
    queryKey: getMemberGenerationPart.cacheKey(userId),
    queryFn: () => getMemberGenerationPart.request(userId),
    staleTime: Infinity,
  });
};

export type MemberGenerationPart = z.infer<typeof memberGenerationPartSchema>;

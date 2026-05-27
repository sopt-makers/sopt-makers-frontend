import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const randomCoffeeChatSchema = z.object({
  memberId: z.number(),
  coffeeChatBio: z.string(),
  profileImage: z.string().nullable(),
  name: z.string(),
  career: z.string(),
  organization: z.string().nullable(),
  companyJob: z.string().nullable(),
  soptActivities: z.array(z.string()),
  topicTypeList: z.array(z.string()),
});

const getRandomCoffeeChatEndpoint = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/members/coffeechat/random',
  }),
  serverResponseScheme: z.array(randomCoffeeChatSchema),
});

export const useGetRandomCoffeeChat = () => {
  return useQuery({
    queryKey: getRandomCoffeeChatEndpoint.cacheKey(),
    queryFn: () => getRandomCoffeeChatEndpoint.request(),
    staleTime: Infinity,
  });
};

export type RandomCoffeeChat = z.infer<typeof randomCoffeeChatSchema>;

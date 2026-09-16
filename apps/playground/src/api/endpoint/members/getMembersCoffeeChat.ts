import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import type { CoffeeChatFilters } from '@/components/coffeechat/CoffeeChatCategory/coffeeChatFilters.types';
import { COFFEE_CHAT_FILTER_OPTIONS } from '@/components/coffeechat/constants';

export const getMembersCoffeeChat = createEndpoint({
  request: ({ query }: { query?: { [key: string]: string } }) => ({
    method: 'GET',
    url: 'api/v1/members/coffeechat',
    params: query, // 쿼리 파라미터 추가
  }),
  serverResponseScheme: z.object({
    coffeeChatList: z.array(
      z.object({
        memberId: z.number().nullable(),
        bio: z.string().nullable(),
        topicTypeList: z.array(z.string()).nullable(),
        profileImage: z.string().nullable(),
        name: z.string().nullable(),
        career: z.string().nullable(),
        organization: z.string().nullable(),
        companyJob: z.string().nullable(),
        soptActivities: z.array(z.string()).nullable(),
        isBlind: z.boolean(),
        isMine: z.boolean(),
      }),
    ),
  }),
});

const toCoffeeChatApiParams = (filters: CoffeeChatFilters): Record<string, string> => {
  const params: Record<string, string> = {};

  for (const key of Object.keys(COFFEE_CHAT_FILTER_OPTIONS) as (keyof typeof COFFEE_CHAT_FILTER_OPTIONS)[]) {
    const option = COFFEE_CHAT_FILTER_OPTIONS[key].find(({ value }) => value === filters[key]);
    if (option?.apiValue) params[key] = option.apiValue;
  }

  if (filters.search) params.search = filters.search;

  return params;
};

export const useGetMembersCoffeeChat = (filters: CoffeeChatFilters, { enabled }: { enabled: boolean }) => {
  const apiParams = toCoffeeChatApiParams(filters);

  return useQuery({
    enabled,
    queryKey: ['getMembersCoffeeChat', apiParams],
    queryFn: () => getMembersCoffeeChat.request({ query: apiParams }),
  });
};

import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';

export const postCoffeechatReview = createEndpoint({
  request: (coffeeChatId: number, nickname: string, content: string) => ({
    method: 'POST',
    url: 'api/v1/members/coffeechat/review',
    json: { coffeeChatId: coffeeChatId, nickname: nickname, content: content },
  }),
  serverResponseScheme: z.unknown(),
});

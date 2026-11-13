import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';
import type { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';

export const editCoffeechat = createEndpoint({
  request: (requestBody: CoffeechatFormContent) => ({
    method: 'PUT',
    url: 'api/v1/members/coffeechat/details',
    json: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

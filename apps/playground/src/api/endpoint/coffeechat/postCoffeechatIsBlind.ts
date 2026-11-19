import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';

export const changeIsBlindCoffeechat = createEndpoint({
  request: (open: boolean) => ({
    method: 'PATCH',
    url: 'api/v1/members/coffeechat/open',
    json: { open: open },
  }),
  serverResponseScheme: z.unknown(),
});

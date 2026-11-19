import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';

export const deleteCoffeechat = createEndpoint({
  request: () => ({
    method: 'DELETE',
    url: `api/v1/members/coffeechat/details`,
  }),
  serverResponseScheme: z.unknown(),
});

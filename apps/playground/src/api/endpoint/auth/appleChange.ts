import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';

export const appleChangeEndpoint = createEndpoint({
  request: (data: { code: string; registerToken: string }) => ({
    method: 'POST',
    url: '/api/v1/idp/apple/change',
    json: data,
  }),
  serverResponseScheme: z.object({
    accessToken: z.string(),
  }),
});

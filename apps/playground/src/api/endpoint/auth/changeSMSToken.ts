import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';

export const changeSMSToken = createEndpoint({
  request: (data: { code: string }) => ({
    method: 'POST',
    url: '/api/v1/change/sms/token',
    json: {
      sixNumberCode: data.code,
    },
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    registerToken: z.string(),
  }),
});

import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { authHttpClient } from '@/api';
import { createEndpoint } from '@/api/createEndpoint';

const verifyPhoneAuth = createEndpoint({
  request: (data: { name: string; phone: string; code: string }) => ({
    method: 'POST',
    url: '/api/v1/auth/verify/phone',
    json: {
      name: data.name,
      phone: data.phone,
      code: data.code,
      type: 'CHANGE_PHONE_NUMBER',
    },
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
    message: z.string().nullable(),
  }),
  client: authHttpClient,
});

export const useVerifyPhoneAuth = () => {
  return useMutation({
    mutationFn: (data: { name: string; phone: string; code: string }) =>
      verifyPhoneAuth.request({
        name: data.name,
        phone: data.phone,
        code: data.code,
      }),
  });
};

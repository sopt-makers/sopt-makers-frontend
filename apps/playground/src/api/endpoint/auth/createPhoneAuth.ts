import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { authHttpClient } from '@/api';
import { createEndpoint } from '@/api/createEndpoint';

const createPhoneAuth = createEndpoint({
  request: (data: { userId: number; phone: string }) => ({
    method: 'POST',
    url: '/api/v1/auth/phone',
    json: {
      userId: data.userId,
      phone: data.phone,
      type: 'CHANGE_PHONE_NUMBER',
    },
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    data: z.null(),
  }),
  client: authHttpClient,
});

export const useCreatePhoneAuth = () => {
  return useMutation({
    mutationFn: (data: { userId: number; phone: string }) =>
      createPhoneAuth.request({
        userId: data.userId,
        phone: data.phone,
      }),
  });
};

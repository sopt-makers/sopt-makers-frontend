import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import type { ApiError } from '@/api/apiError';
import type { GetResponseType } from '@/api/createEndpoint';
import { createEndpoint } from '@/api/createEndpoint';

export const postWord = createEndpoint({
  request: (wordchainId: number, word: string) => ({
    method: 'POST',
    url: 'api/v1/chainWordGame/wordGame',
    json: { roomId: wordchainId, word },
  }),
  serverResponseScheme: z.object({
    roomId: z.number(),
    word: z.string(),
    user: z.object({
      id: z.number(),
      profileImage: z
        .string()
        .nullable()
        .transform((profileImage) => profileImage ?? ''),
      name: z.string(),
    }),
  }),
});

export const usePostWord = (
  options?: Omit<
    UseMutationOptions<GetResponseType<typeof postWord>, ApiError, { wordchainId: number; word: string }, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    mutationKey: ['postWord'],
    mutationFn: async ({ wordchainId, word }: { wordchainId: number; word: string }) => {
      const response = await postWord.request(wordchainId, word);
      return response;
    },
    ...options,
  });
};

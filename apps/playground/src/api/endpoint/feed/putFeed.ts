import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import type { EditFeedDataType } from '@/components/feed/upload/types';

export const putFeed = createEndpoint({
  request: (requestBody: EditFeedDataType) => ({
    method: 'PUT',
    url: 'api/v1/community/posts',
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const useEditFeed = () => {
  return useMutation({
    mutationFn: (requestBody: EditFeedDataType) => putFeed.request(requestBody),
  });
};

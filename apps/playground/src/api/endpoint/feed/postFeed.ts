import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';
import type { PostedFeedDataType } from '@/components/feed/upload/types';

export const uploadFeed = createEndpoint({
  request: (requestBody: PostedFeedDataType) => ({
    method: 'POST',
    url: 'api/v1/community/posts',
    json: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const useUploadFeed = () => {
  return useMutation({
    mutationFn: (requestBody: PostedFeedDataType) => uploadFeed.request(requestBody),
  });
};

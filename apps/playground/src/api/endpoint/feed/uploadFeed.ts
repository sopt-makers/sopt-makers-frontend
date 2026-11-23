import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';
import type { PostedFeedDataType } from '@/components/feed/upload/types';

export const uploadFeed = createEndpoint({
  request: (reqeustBody: PostedFeedDataType) => ({
    method: 'POST',
    url: 'api/v1/community/posts',
    json: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});

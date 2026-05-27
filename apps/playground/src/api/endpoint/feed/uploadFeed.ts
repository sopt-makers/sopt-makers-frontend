import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import type { PostedFeedDataType } from '@/components/feed/upload/types';

export const uploadFeed = createEndpoint({
  request: (reqeustBody: PostedFeedDataType) => ({
    method: 'POST',
    url: 'api/v1/community/posts',
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});

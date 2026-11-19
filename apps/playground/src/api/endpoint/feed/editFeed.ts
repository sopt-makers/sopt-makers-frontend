import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';
import type { EditFeedDataType } from '@/components/feed/upload/types';

export const editFeed = createEndpoint({
  request: (requestBody: EditFeedDataType) => ({
    method: 'PUT',
    url: 'api/v1/community/posts',
    json: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

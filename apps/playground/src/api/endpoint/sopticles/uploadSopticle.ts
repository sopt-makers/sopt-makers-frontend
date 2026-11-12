import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';

export const uploadSopticle = createEndpoint({
  request: (link: string, writerIds: number[]) => ({
    method: 'POST',
    url: `api/v1/sopticles`,
    json: {
      link,
      writerIds,
    },
  }),
  serverResponseScheme: z.unknown(),
});

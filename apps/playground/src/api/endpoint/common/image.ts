import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';
import { createHttpClient } from '@/api/httpClient';

export const getPresignedUrl = createEndpoint({
  request: ({ filename, type }: { filename: string; type?: string }) => ({
    method: 'GET',
    url: 'api/v1/presigned-url',
    searchParams: {
      filename,
      type,
    },
  }),
  serverResponseScheme: z.object({
    filename: z.string(),
    signedUrl: z.string(),
  }),
});

export const putPresignedUrl = async ({ file, signedUrl }: { file: File; signedUrl: string }) => {
  const url = decodeURIComponent(signedUrl);
  const uploadClient = createHttpClient({ baseUrl: new URL(url).origin, credentials: 'omit' });
  await uploadClient.request<void>(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
};

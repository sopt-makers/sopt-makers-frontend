import { z } from 'zod';

import { adminHttpClient } from '@/api';
import { createEndpoint } from '@/api/createEndpoint';

export interface RequestBody {
  generation: number;
  part: 'iOS' | 'PLAN' | 'DESIGN' | 'SERVER' | 'ANDROID' | 'WEB';
  mainCategory: '전체 활동' | '서류/면접';
  subActivities?: string[]; // 전체활동 선택 시
  subRecruiting?: '서류/면접' | '서류' | '면접'; // 서류/면접 선택시
  author: string;
  authorProfileImageUrl?: string;
  link: string;
}

export const postReview = createEndpoint({
  request: (requestBody: RequestBody) => ({
    method: 'POST',
    url: `reviews`,
    json: requestBody,
  }),
  serverResponseScheme: z.unknown(),
  client: adminHttpClient,
});

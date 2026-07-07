import type { CreateMeetingDemandRequest } from '@api/meetingDemand/type';
import { z } from 'zod';

export const suggestFormSchema: z.ZodType<CreateMeetingDemandRequest> = z.object({
  shortIntro: z.string().trim().min(1).max(30),
  expectation: z.string().trim().min(1).max(1000),
  meetingKeywordTypes: z.array(z.string()).min(1).max(2),
  joinInfo: z.object({
    meetingType: z.enum(['온라인', '오프라인', '온-오프']).optional(),
    meetingFrequency: z.enum(['가볍게', '적당히', '집중형']).optional(),
  }),
});

export type SuggestFormValues = CreateMeetingDemandRequest;

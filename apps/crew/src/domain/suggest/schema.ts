import { z } from 'zod';

export const suggestFormSchema = z.object({
  title: z.string().trim().min(1).max(30),
  expectation: z.string().trim().min(1).max(1000),
  topics: z.array(z.string()).min(1).max(2),
  participationMethod: z.string(),
  participationLevel: z.string(),
});

export type SuggestFormValues = z.infer<typeof suggestFormSchema>;

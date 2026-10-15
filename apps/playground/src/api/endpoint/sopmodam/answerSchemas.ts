import { z } from 'zod';

export const MAX_SOPMODAM_ANSWER_LENGTH = 500;

// 서버의 오프셋 없는 LocalDateTime은 KST로 해석합니다.
export const getSopmodamAnswerEndTime = (answerEndAt: string) =>
  Date.parse(/(?:Z|[+-]\d{2}:\d{2})$/i.test(answerEndAt) ? answerEndAt : `${answerEndAt}+09:00`);

export const SopmodamAnswerContentSchema = z
  .string()
  .max(MAX_SOPMODAM_ANSWER_LENGTH)
  .refine((content) => content.trim().length > 0, '경험담을 입력해주세요.');

export const SopmodamAnswerSchema = z.object({
  answerId: z.number().int().positive(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SopmodamMyAnswerSchema = z.object({
  roundId: z.number().int().positive(),
  question: z.object({ questionId: z.number().int().positive(), content: z.string() }),
  answerEndAt: z.string().refine((value) => Number.isFinite(getSopmodamAnswerEndTime(value))),
  canEdit: z.boolean(),
  answer: SopmodamAnswerSchema.nullable(),
});

export type SopmodamAnswer = z.infer<typeof SopmodamAnswerSchema>;
export type SopmodamMyAnswerResponse = z.infer<typeof SopmodamMyAnswerSchema>;

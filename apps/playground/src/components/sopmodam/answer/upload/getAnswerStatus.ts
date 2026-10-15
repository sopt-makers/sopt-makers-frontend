import type { SopmodamAnswerStatus, SopmodamMyAnswerResponse } from '@/components/sopmodam/answer/upload/types';

type AnswerStatusInput = Pick<SopmodamMyAnswerResponse, 'answer' | 'canEdit'>;

export const getAnswerStatus = ({ answer, canEdit }: AnswerStatusInput): SopmodamAnswerStatus => {
  if (answer !== null) {
    return { type: canEdit ? 'editable' : 'readonly', answer };
  }

  return { type: canEdit ? 'available' : 'unavailable' };
};

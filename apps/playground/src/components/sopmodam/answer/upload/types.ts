export interface SopmodamAnswer {
  answerId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface SopmodamMyAnswerResponse {
  roundId: number;
  question: {
    questionId: number;
    content: string;
  };
  answerEndAt: string;
  canEdit: boolean;
  answer: SopmodamAnswer | null;
}

export type SopmodamAnswerStatus =
  | { type: 'available' }
  | { type: 'unavailable' }
  | { type: 'editable'; answer: SopmodamAnswer }
  | { type: 'readonly'; answer: SopmodamAnswer };

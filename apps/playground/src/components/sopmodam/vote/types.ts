export interface SopmodamVoteQuestion {
  questionId: number;
  content: string;
}

export type SopmodamVoteStatus =
  | { type: 'available' }
  | { type: 'unavailable' }
  | { type: 'voted'; questionId: number };

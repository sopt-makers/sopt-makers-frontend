export interface SopmodamVoteQuestion {
  questionId: number;
  content: string;
}

export interface SopmodamVoteState {
  questions: SopmodamVoteQuestion[];
  canVote: boolean;
  hasVoted: boolean;
  myVoteQuestionId: number | null;
}

export type SoptmodamPhase = 'VOTING' | 'ANSWERING' | 'REVEALED';

export type SoptmodamBannerData =
  | { cardType: 'VOTE'; roundId: number; eventName: string; dDay: number }
  | { cardType: 'ANSWER_PREPARING'; selectedQuestion: string; answerEndAt: string }
  | { cardType: 'ANSWER_COLLECTING'; roundId: number; selectedQuestion: string; dDay: number }
  | { cardType: 'REVEALED'; roundId: number; selectedQuestion: string; answerCount: number };

export type SoptmodamCardType = SoptmodamBannerData['cardType'];

export interface SoptmodamBannerResponse {
  roundId: number;
  eventName: string;
  phase: SoptmodamPhase;
  cardType: SoptmodamCardType;
  voteEndAt: string;
  answerEndAt: string;
  dDay: number | null;
  selectedQuestion: { questionId: number; content: string } | null;
  canVote: boolean;
  hasVoted: boolean;
  canAnswer: boolean;
  hasAnswered: boolean;
  answerCount: number | null;
}

// getBannerContent 타입 추론용
type BannerFieldsByCardType = {
  [T in SoptmodamCardType]: Omit<Extract<SoptmodamBannerData, { cardType: T }>, 'cardType'>;
};
export type SoptmodamBannerDataOf<T extends SoptmodamCardType> = { cardType: T } & BannerFieldsByCardType[T];

export interface SoptmodamBannerContent {
  tag: string;
  description: string;
  button?: { label: string; href: string };
}

import type { ClickEvents } from '@/components/eventLogger/events';

export type SopmodamPhase = 'VOTING' | 'ANSWERING' | 'REVEALED';

export type SopmodamBannerData =
  | { cardType: 'VOTE'; roundId: number; eventName: string; dDay: number }
  | { cardType: 'ANSWER_PREPARING'; selectedQuestion: string; answerEndAt: string }
  | { cardType: 'ANSWER_COLLECTING'; roundId: number; selectedQuestion: string; dDay: number }
  | { cardType: 'REVEALED'; roundId: number; selectedQuestion: string; answerCount: number };

export type SopmodamCardType = SopmodamBannerData['cardType'];

export interface SopmodamBannerResponse {
  roundId: number;
  eventName: string;
  phase: SopmodamPhase;
  cardType: SopmodamCardType;
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
  [T in SopmodamCardType]: Omit<Extract<SopmodamBannerData, { cardType: T }>, 'cardType'>;
};
export type SopmodamBannerDataOf<T extends SopmodamCardType> = { cardType: T } & BannerFieldsByCardType[T];

export interface SopmodamBannerContent {
  tag: string;
  description: string;
  button?: { label: string; href: string; eventKey?: keyof ClickEvents };
}

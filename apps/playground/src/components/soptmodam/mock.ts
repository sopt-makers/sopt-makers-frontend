// TODO: API 연동 시 삭제
export type SoptmodamPhase = 'VOTING' | 'ANSWERING' | 'REVEALED';
export type SoptmodamCardType = 'VOTE' | 'ANSWER_PREPARING' | 'ANSWER_COLLECTING' | 'REVEALED';

export interface SoptmodamBannerResponse {
  roundId: number;
  eventName: string;
  phase: SoptmodamPhase;
  cardType: SoptmodamCardType;
  voteEndAt: string;
  answerEndAt: string;
  dDay: number;
  selectedQuestion: string | null;
  canVote: boolean;
  hasVoted: boolean;
  canAnswer: boolean;
  hasAnswered: boolean;
  answerCount: number | null;
}

export const SOPTMODAM_BANNER_MOCK: SoptmodamBannerResponse = {
  roundId: 1,
  eventName: 'SOPT 첫 협업',
  phase: 'VOTING',
  cardType: 'REVEALED',
  voteEndAt: '2026-10-15T00:00:00',
  answerEndAt: '2026-11-05T00:00:00',
  dDay: 4,
  selectedQuestion: '첫 협업 전, 내 파트에서 무엇을 준비해두면 좋을까요?',
  canVote: true,
  hasVoted: false,
  canAnswer: false,
  hasAnswered: false,
  answerCount: 6,
};

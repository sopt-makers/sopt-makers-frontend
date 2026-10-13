// TODO: API 연동 시 삭제
import type { SoptmodamBannerResponse } from '@/components/soptmodam/types';

// 서버가 204(노출할 카드 없음)를 내려주면 null
export const SOPTMODAM_BANNER_MOCK: SoptmodamBannerResponse | null = {
  roundId: 1,
  eventName: 'SOPT 첫 협업',
  phase: 'VOTING',
  cardType: 'VOTE',
  voteEndAt: '2026-10-15T00:00:00',
  answerEndAt: '2026-11-05T00:00:00',
  dDay: 0,
  selectedQuestion: { questionId: 1, content: '첫 협업 전, 내 파트에서 무엇을 준비해두면 좋을까요?' },
  canVote: true,
  hasVoted: false,
  canAnswer: true,
  hasAnswered: false,
  answerCount: 6,
};

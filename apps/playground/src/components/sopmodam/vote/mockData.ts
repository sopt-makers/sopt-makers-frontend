import type { SopmodamVoteState } from '@/components/sopmodam/vote/types';

// UI 구현 단계의 디자인 예시. API 연동 시 실제 라운드 조회 결과로 교체합니다.
export const sopmodamVoteMockData: SopmodamVoteState & { eventName: string } = {
  eventName: 'SOPT 첫 협업',
  canVote: true,
  hasVoted: false,
  myVoteQuestionId: null,
  questions: [
    { questionId: 1, content: '첫 협업 전, 내 파트에서 무엇을 준비해두면 좋을까요?' },
    { questionId: 2, content: '다른 파트와 역할과 일하는 방식을 어떻게 맞추셨나요?' },
    { questionId: 3, content: '협업 중 의견이 다를 때 어떻게 조율하셨나요?' },
    { questionId: 4, content: '첫 협업에서 겪은 가장 큰 시행착오는 무엇이었나요?' },
  ],
};

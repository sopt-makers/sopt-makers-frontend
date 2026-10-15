import type { SopmodamAnswer, SopmodamMyAnswerResponse } from '@/components/sopmodam/answer/upload/types';

// UI 구현 단계의 디자인 예시. API 연동 시 질문과 내 답변 조회 결과로 교체합니다.
export const sopmodamAnswerMockData: SopmodamMyAnswerResponse = {
  roundId: 1,
  question: {
    questionId: 1,
    content: '첫 협업 전, 내 파트에서 무엇을 준비해두면 좋을까요?',
  },
  answerEndAt: '2026-11-01T00:00:00',
  canEdit: true,
  answer: null,
};

// 공개 예정일의 API 필드는 미정이므로, 모집 마감일(answerEndAt)과 분리한 디자인 예시를 사용합니다.
export const sopmodamAnswerReleaseDateMock = '11월 2일';

// API 연동 전 화면 전환을 확인하기 위한 메모리 내 성공 응답입니다. 실제 저장은 하지 않습니다.
export const saveSopmodamAnswerMock = (
  content: string,
  previousAnswer: SopmodamAnswer | null,
): Promise<SopmodamAnswer> => {
  const savedAt = new Date().toISOString();

  return Promise.resolve({
    answerId: previousAnswer?.answerId ?? 1,
    content,
    createdAt: previousAnswer?.createdAt ?? savedAt,
    updatedAt: savedAt,
  });
};

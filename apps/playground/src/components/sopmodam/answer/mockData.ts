import type { SopmodamAnswer } from '@/components/sopmodam/answer/types';

// UI 구현 단계의 디자인 예시. API 연동 시 질문과 내 답변 조회 결과로 교체합니다.
export const sopmodamAnswerMockData: {
  questionContent: string;
  releaseDate: string;
  canWrite: boolean;
  myAnswer: SopmodamAnswer | null;
} = {
  questionContent: '첫 협업 전, 내 파트에서 무엇을 준비해두면 좋을까요?',
  releaseDate: '11월 2일',
  canWrite: true,
  myAnswer: null,
};

// API 연동 전 화면 전환을 확인하기 위한 메모리 내 성공 응답입니다. 실제 저장은 하지 않습니다.
export const saveSopmodamAnswerMock = (content: string, answerId: number | null): Promise<SopmodamAnswer> => {
  return Promise.resolve({ answerId: answerId ?? 1, content });
};

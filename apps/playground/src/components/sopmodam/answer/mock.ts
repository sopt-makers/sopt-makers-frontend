// TODO: API 연동 시 삭제
import type { SopmodamAnswersResponse } from '@/api/endpoint/sopmodam/getSopmodamAnswers';

export const SOPMODAM_ANSWERS_MOCK: SopmodamAnswersResponse = {
  roundId: 1,
  eventName: 'SOPT 첫 협업',
  question: {
    questionId: 1,
    content: '첫 협업 전, 내 파트에서 무엇을 준비해두면 좋을까요?',
  },
  answerCount: 10,
  answers: [
    {
      answerId: 1,
      content:
        '기획자라면 완성도 높은 기획서보다 "왜 이 기능이 필요한지"를 한 문장으로 설명할 수 있게 준비해두세요.\n디자이너와 개발자가 가장 먼저 묻는 게 결국 그 질문이더라고요.',
      createdAt: '2026-10-20T10:12:00',
      updatedAt: '2026-10-20T10:12:00',
      writer: { memberId: 101, name: '최근영', profileImage: null, generation: 37, part: '기획' },
    },
    {
      answerId: 2,
      content:
        '피그마 파일 정리를 미리 해두면 좋아요. 컴포넌트 이름 규칙, 페이지 구분만 맞춰도 개발자와 소통 비용이 확 줄어요.',
      createdAt: '2026-10-20T11:30:00',
      updatedAt: '2026-10-20T11:30:00',
      writer: { memberId: 102, name: '김디자', profileImage: null, generation: 36, part: '디자인' },
    },
    {
      answerId: 3,
      content:
        'Git 브랜치 전략과 커밋 컨벤션을 팀원들과 첫 주에 정하세요.\n중간에 바꾸려면 훨씬 힘들어요.\n\nPR 템플릿도 같이 만들어두면 리뷰가 편해집니다.',
      createdAt: '2026-10-20T13:02:11',
      updatedAt: '2026-10-20T13:02:11',
      writer: { memberId: 103, name: '박웹', profileImage: null, generation: 35, part: '웹' },
    },
    {
      answerId: 4,
      content:
        'API 명세를 서버 파트와 일찍 맞추는 게 제일 중요했어요. 응답 형식이 정해지기 전이라도 목 데이터로 화면을 먼저 만들어두면 일정이 덜 밀려요.',
      createdAt: '2026-10-20T15:45:00',
      updatedAt: '2026-10-20T15:45:00',
      writer: { memberId: 104, name: '이아요', profileImage: null, generation: 34, part: 'iOS' },
    },
    {
      answerId: 5,
      content:
        '서버는 ERD부터 그려보세요. 기획이 바뀌어도 데이터 구조가 탄탄하면 대응이 빨라요.\n그리고 배포 환경은 꼭 초반에 세팅해두세요.',
      createdAt: '2026-10-21T09:00:00',
      updatedAt: '2026-10-21T09:00:00',
      writer: { memberId: 105, name: '정서버', profileImage: null, generation: 36, part: '서버' },
    },
    {
      answerId: 6,
      content:
        '안드로이드는 디자인 시스템에 맞춰 공통 컴포넌트를 먼저 만들어두면 이후 화면 작업 속도가 정말 빨라져요. 테마, 색상, 글씨 스타일부터 잡는 걸 추천해요.',
      createdAt: '2026-10-21T10:20:00',
      updatedAt: '2026-10-21T10:20:00',
      writer: { memberId: 106, name: '한안드', profileImage: null, generation: 33, part: '안드로이드' },
    },
    {
      answerId: 7,
      content:
        '협업 전에 내가 잘하는 것과 못하는 것을 솔직하게 정리해서 공유해보세요. 기대치를 맞추는 것만으로도 갈등이 많이 줄어요.',
      createdAt: '2026-10-21T12:00:00',
      updatedAt: '2026-10-21T12:00:00',
      writer: { memberId: 107, name: '오기획', profileImage: null, generation: 32, part: '기획' },
    },
    {
      answerId: 8,
      content:
        '디자이너라면 개발 가능한 범위를 미리 물어보세요.\n애니메이션이나 인터랙션은 구현 난이도 차이가 커서, 초반에 합의해두면 나중에 서로 아쉬울 일이 줄어요.',
      createdAt: '2026-10-21T14:30:00',
      updatedAt: '2026-10-21T14:30:00',
      writer: { memberId: 108, name: '윤디자', profileImage: null, generation: 35, part: '디자인' },
    },
    {
      answerId: 9,
      content: '회의록을 꼭 남기세요. 결정된 내용이 어디 있는지 모르면 같은 회의를 두 번 하게 돼요.',
      createdAt: '2026-10-21T16:10:00',
      updatedAt: '2026-10-21T16:10:00',
      writer: { memberId: 109, name: '강웹', profileImage: null, generation: 37, part: '웹' },
    },
    {
      answerId: 10,
      content:
        '첫 협업은 결과물보다 함께 일하는 방식을 배우는 시간이라고 생각하면 마음이 편해요.\n작은 것이라도 매일 진행 상황을 공유하는 습관을 들여보세요.',
      createdAt: '2026-10-22T09:40:00',
      updatedAt: '2026-10-22T09:40:00',
      writer: { memberId: 110, name: '조서버', profileImage: null, generation: 34, part: '서버' },
    },
    {
      answerId: 11,
      content:
        '5줄이 넘으면 어떻게 될까\n5줄이 넘으면 어떻게 될까\n5줄이 넘으면 어떻게 될까\n5줄이 넘으면 어떻게 될까\n5줄이 넘으면 어떻게 될까\n5줄이 넘으면 어떻게 될까\n5줄이 넘으면 어떻게 될까\n5줄이 넘으면 어떻게 될까\n',
      createdAt: '2026-10-22T09:40:00',
      updatedAt: '2026-10-22T09:40:00',
      writer: { memberId: 115, name: '장민수', profileImage: null, generation: 34, part: '서버' },
    },
    {
      answerId: 12,
      content:
        '토스 PM을 목표로 한다면, 완성도 높은 결과물보다 ‘문제를 어떻게 정의하고 풀었는지’를 먼저 보여주는 게 중요해요.\n포트폴리오는 어떤 문제를 발견했고 왜 그 문제가 중요하다고 생각했는지 어떤 가설을 세웠고 그걸 어떻게 검증했는지 이 흐름이 잘 보이면 좋아요. 실제 서비스가 아니어도, 프로젝트나 과제에서 본인이 주도적으로 고민한 부분을 명확히 드러내는 게 도움이 됩니다.  그리고 포트폴리오는 많이 만드는 것보다 깊이 있게 정리한 2–3개 정도가 적당해요.“이걸 왜 이렇게 만들었는지”를 설명할 수 있으면 충분해요.',
      createdAt: '2026-10-22T09:40:00',
      updatedAt: '2026-10-22T09:40:00',
      writer: { memberId: 115, name: '장민수', profileImage: null, generation: 34, part: '서버' },
    },
  ],
};

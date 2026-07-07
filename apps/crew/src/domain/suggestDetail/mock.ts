import type { MeetingDemandCommentData, MeetingDemandDetailData } from './types';

// @TODO: 모임 제안 상세 조회 API 연동 후 제거
export const MOCK_MEETING_DEMAND_DETAIL: MeetingDemandDetailData = {
  id: 1,
  author: { orgId: '1001', name: '이진혁' },
  createdAt: '2시간 전',
  shortIntro: '미모스 방학 버전 기대합니다',
  expectation: '저 미모스 한 번도 안해봤는데 방학버전도 열어주시면 안되나요?? 아 저도 갓생 살아보고 싶어요',
  keywords: [
    { label: '취미', hashed: false },
    { label: '가볍게', hashed: true },
    { label: '온라인', hashed: true },
  ],
  viewCount: 323,
  status: 'OPENED',
  waitCount: 19,
  isWaiting: false,
  openedMeetings: [
    {
      id: 101,
      imageUrl: 'https://picsum.photos/id/3/400/300',
      title: '한줄은 한줄이고, 두줄이 되면 이렇게 넘어갑니다',
      description: '프로그래밍을 배우고 싶은 분들을 위한 초급 과정입니다',
      category: '스터디',
      author: { orgId: '1002', name: '손은서' },
      approvedCount: 0,
      capacity: 15,
      generation: '활동 기수',
      parts: ['기획', '디자인', 'Android', 'iOS', '서버'],
    },
    {
      id: 102,
      imageUrl: 'https://picsum.photos/id/20/400/300',
      title: '미모스 방학 버전, 야르 두줄 칸 넘어가면 말줄임표 이렇게',
      description: '갓생 살고 싶은 분들을 위한 습관 챌린지 모임입니다',
      category: '챌린지',
      author: { orgId: '1003', name: '이정연' },
      approvedCount: 3,
      capacity: 10,
      generation: '전체 기수',
      parts: ['전체'],
    },
    {
      id: 103,
      imageUrl: 'https://picsum.photos/id/26/400/300',
      title: '러닝크루 with 미모스',
      description: '주 1회 같이 달리는 러닝 모임입니다',
      category: '취미',
      author: { orgId: '1004', name: '통찰력없는 봉식이' },
      approvedCount: 5,
      capacity: 20,
      generation: '활동 기수',
      parts: ['전체'],
    },
  ],
};

// @TODO: 댓글 목록 조회 API 연동 후 제거
export const MOCK_MEETING_DEMAND_COMMENTS: MeetingDemandCommentData[] = [
  {
    id: 1,
    author: { orgId: '1004', name: '통찰력없는 봉식이님' },
    isAuthor: false,
    createdAt: '21분 전',
    content: '야르',
    likeCount: 19,
    isLiked: false,
  },
  {
    id: 2,
    author: { orgId: '1001', name: '이진혁' },
    isAuthor: true,
    createdAt: '21분 전',
    content: '손은서언니바보',
    likeCount: 19,
    isLiked: true,
  },
];

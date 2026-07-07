import type { MeetingDemandCommentData } from './types';

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

import type { components } from '@/__generated__/schema';

// TODO: 회식 상세 및 회차별 참석자 목록 API 연동
export const rounds = [
  {
    roundId: 1,
    roundNumber: 1,
    attendeeCount: 11,
    isClosed: false,
    isPlaceModified: false,
    isLinkModified: false,
    isStartTimeModified: false,
    isNew: false,
    myAttendanceStatus: 'ATTENDING',
    showNewRoundGuide: false,
  },
  {
    roundId: 2,
    roundNumber: 2,
    attendeeCount: 4,
    isClosed: false,
    isPlaceModified: false,
    isLinkModified: false,
    isStartTimeModified: false,
    isNew: false,
    myAttendanceStatus: 'ATTENDING',
    showNewRoundGuide: false,
  },
] satisfies [components['schemas']['DiningV2RoundDto'], ...components['schemas']['DiningV2RoundDto'][]];

export const attendeeResponsesByRound: Record<
  number,
  components['schemas']['DiningV2GetAttendeeManagementResponseDto']
> = {
  1: {
    meta: { page: 1, take: 50, itemCount: 11, pageCount: 1, hasPreviousPage: false, hasNextPage: false },
    attendees: [
      { id: 1, attendanceNumber: 1, name: '김지우', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 2, attendanceNumber: 2, name: '이서준', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 3, attendanceNumber: 3, name: '박서연', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 4, attendanceNumber: 4, name: '최민준', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 5, attendanceNumber: 5, name: '정하은', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 6, attendanceNumber: 6, name: '강도윤', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 7, attendanceNumber: 7, name: '조수빈', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 8, attendanceNumber: 8, name: '윤지호', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 9, attendanceNumber: 9, name: '장유진', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 10, attendanceNumber: 10, name: '임현우', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 11, attendanceNumber: 11, name: '한지민', recentGeneration: 39, phone: '010-1234-1234' },
    ],
  },
  2: {
    meta: { page: 1, take: 50, itemCount: 4, pageCount: 1, hasPreviousPage: false, hasNextPage: false },
    attendees: [
      { id: 1, attendanceNumber: 1, name: '오하린', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 2, attendanceNumber: 2, name: '서준호', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 3, attendanceNumber: 3, name: '권예린', recentGeneration: 39, phone: '010-1234-1234' },
      { id: 4, attendanceNumber: 4, name: '신재원', recentGeneration: 39, phone: '010-1234-1234' },
    ],
  },
};

// @TODO: API 연동 시 목 응답 생성 제거 (장정훈)
export const getMockAttendees = ({
  roundId,
  page,
  take,
  date,
}: {
  roundId: number;
  page: number;
  take: number;
  date: 'asc' | 'desc';
}): components['schemas']['DiningV2GetAttendeeManagementResponseDto'] => {
  const attendees = [...(attendeeResponsesByRound[roundId]?.attendees ?? [])].sort((a, b) =>
    date === 'asc' ? a.attendanceNumber - b.attendanceNumber : b.attendanceNumber - a.attendanceNumber,
  );
  const pageCount = Math.ceil(attendees.length / take);
  const pageAttendees = attendees.slice((page - 1) * take, page * take);

  return {
    attendees: pageAttendees,
    meta: {
      page,
      take,
      itemCount: pageAttendees.length,
      pageCount,
      hasPreviousPage: page > 1,
      hasNextPage: page < pageCount,
    },
  };
};

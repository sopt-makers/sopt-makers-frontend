import type { components } from '@/__generated__/schema';

// TODO: 회차별 참석자 조회 API 연동 후 삭제
export const attendanceMocks = {
  attendees: [
    { id: 1, name: '오아리', profileImage: '' },
    { id: 2, name: '김민지', profileImage: '' },
    { id: 3, name: '이서준', profileImage: '' },
    { id: 4, name: '박지우', profileImage: '' },
    { id: 5, name: '최유진', profileImage: '' },
  ],
} satisfies components['schemas']['DiningV2GetAttendeesResponseDto'];

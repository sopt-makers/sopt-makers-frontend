import type { SettlementCardItem } from '@api/settlement/type';

// TODO: API 연동 후 삭제
export const settlementFixtures: SettlementCardItem[] = Array.from({ length: 12 }, (_, index) => ({
  meetingId: index + 1,
  title: '회식명',
  diningDate: '2026-05-12',
  imageUrl: '',
  joinableParts: ['PM', 'DESIGN'],
  isEnded: index % 3 !== 1,
  attendeeCount: 99,
  leader: {
    id: 1,
    name: '홍길동',
    profileImage: '',
  },
  canManageAttendees: index === 0 || index === 1 || index === 3,
}));

export const mySettlementFixtures = settlementFixtures.slice(0, 6);

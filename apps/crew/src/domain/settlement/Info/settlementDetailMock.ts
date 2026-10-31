import type { SettlementDetail } from '../types';

// TODO: API 연동 후 삭제
export const settlementDetailMock: SettlementDetail[] = Array.from({ length: 12 }, (_, index) => ({
  meetingId: index + 1,
  title: '회식명',
  diningDate: '2026-05-12',
  isDateModified: false,
  imageUrl: '',
  isEnded: index % 3 !== 1,
  joinableParts: ['PM', 'DESIGN'],
  leader: { id: 1, name: '홍길동', profileImage: '' },
  isLeader: false,
  isApprovedPayer: false,
  rounds: [],
}));

import { settlementListMocks } from '../detail/SettlementList/mock';
import type { SettlementDetail } from '../types';

// TODO: API 연동 후 삭제
export const settlementDetailMock: SettlementDetail[] = Array.from({ length: 12 }, (_, index) => {
  const isEnded = index % 3 !== 1;
  const isLeader = index === 0 || index === 1;
  const leaderAttendanceStatus = isEnded ? 'ATTENDED' : 'ATTENDING';

  return {
    meetingId: index + 1,
    title: '회식명',
    diningDate: '2026-05-12',
    isDateModified: false,
    imageUrl: '',
    isEnded,
    joinableParts: ['PM', 'DESIGN'],
    leader: { id: 1, name: '홍길동', profileImage: '' },
    isLeader,
    isApprovedPayer: false,
    rounds: settlementListMocks.beforeJoining.rounds.map((round) => ({
      ...round,
      isClosed: isEnded,
      myAttendanceStatus: isLeader ? leaderAttendanceStatus : round.myAttendanceStatus,
    })),
  };
});

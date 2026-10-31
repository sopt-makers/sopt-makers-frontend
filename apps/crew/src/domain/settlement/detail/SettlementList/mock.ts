// TODO: API 연동 후 삭제
import type { ComponentProps } from 'react';

import { attendanceMocks } from '../AttendanceModal/mock';
import type SettlementList from './index';

type SettlementListMock = Omit<ComponentProps<typeof SettlementList>, 'meetingId'>;
type Round = SettlementListMock['rounds'][number];

const firstRound: Round = {
  roundId: 1,
  roundNumber: 1,
  place: '비틀비틀 비틀스 타코 서순라길 점',
  naverMapLink: 'https://map.naver.com/',
  kakaoMapLink: 'https://map.kakao.com/',
  startTime: '19:45',
  attendeeCount: attendanceMocks.attendees.length,
  isClosed: false,
  isPlaceModified: false,
  isLinkModified: false,
  isStartTimeModified: false,
  isNew: false,
  showNewRoundGuide: false,
  myAttendanceStatus: 'NOT_ATTENDING',
};

const secondRound: Round = {
  ...firstRound,
  roundId: 2,
  roundNumber: 2,
  startTime: '21:00',
};

export const settlementListMocks = {
  beforeJoining: {
    isLeader: false,
    isEnded: false,
    rounds: [firstRound],
  },
  afterJoining: {
    isLeader: false,
    isEnded: false,
    rounds: [{ ...firstRound, myAttendanceStatus: 'ATTENDING' }],
  },
  newRound: {
    isLeader: false,
    isEnded: false,
    rounds: [
      { ...firstRound, isClosed: true, myAttendanceStatus: 'ATTENDED', myPayerStatus: 'PENDING' },
      { ...secondRound, isClosed: true, myAttendanceStatus: 'ATTENDED', myPayerStatus: 'APPROVED' },
      { ...secondRound, roundId: 3, roundNumber: 3, isNew: true },
    ],
  },
  modifiedRound: {
    isLeader: false,
    isEnded: false,
    rounds: [{ ...firstRound, isPlaceModified: true }],
  },
  lateJoinerBeforeJoining: {
    isLeader: false,
    isEnded: false,
    rounds: [{ ...firstRound, isClosed: true }, secondRound],
  },
  lateJoinerAfterJoining: {
    isLeader: false,
    isEnded: false,
    rounds: [
      { ...firstRound, isClosed: true },
      { ...secondRound, myAttendanceStatus: 'ATTENDING' },
    ],
  },
  leaderBeforeClosing: {
    isLeader: true,
    isEnded: false,
    rounds: [{ ...firstRound, myAttendanceStatus: 'ATTENDING' }],
  },
  leaderAfterClosing: {
    isLeader: true,
    isEnded: false,
    rounds: [
      { ...firstRound, isClosed: true, myAttendanceStatus: 'ATTENDED' },
      { ...secondRound, myAttendanceStatus: 'ATTENDING' },
    ],
  },
} satisfies Record<string, SettlementListMock>;

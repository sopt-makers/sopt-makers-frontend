import type { GetSettlementAttendees, GetSettlementList } from './type';

const SettlementQueryKey = {
  all: () => ['settlement'] as const,
  lists: () => [...SettlementQueryKey.all(), 'list'] as const,
  list: (params: GetSettlementList['request']) => [...SettlementQueryKey.lists(), params] as const,
  attendance: (meetingId: number, roundId: number) =>
    [...SettlementQueryKey.all(), 'attendance', meetingId, roundId] as const,
  detail: (meetingId: number) => [...SettlementQueryKey.all(), 'detail', meetingId] as const,
  payerRequests: (meetingId: number) => [...SettlementQueryKey.all(), 'payerRequests', meetingId] as const,
  attendees: (meetingId: number, roundId: number) =>
    [...SettlementQueryKey.all(), 'attendees', meetingId, roundId] as const,
  attendeeList: (
    meetingId: number,
    roundId: number,
    params: Pick<GetSettlementAttendees['request'], 'page' | 'take' | 'date'>,
  ) => [...SettlementQueryKey.attendees(meetingId, roundId), params] as const,
};

export default SettlementQueryKey;

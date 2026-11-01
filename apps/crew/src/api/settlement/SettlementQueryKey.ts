import type { SettlementAttendeesRequest } from './type';

const SettlementQueryKey = {
  all: () => ['settlement'] as const,
  detail: (meetingId: number) => [...SettlementQueryKey.all(), 'detail', meetingId] as const,
  payerRequests: (meetingId: number) => [...SettlementQueryKey.all(), 'payerRequests', meetingId] as const,
  attendees: (meetingId: number, roundId: number) =>
    [...SettlementQueryKey.all(), 'attendees', meetingId, roundId] as const,
  attendeeList: (
    meetingId: number,
    roundId: number,
    params: Pick<SettlementAttendeesRequest, 'page' | 'take' | 'date'>,
  ) => [...SettlementQueryKey.attendees(meetingId, roundId), params] as const,
};

export default SettlementQueryKey;

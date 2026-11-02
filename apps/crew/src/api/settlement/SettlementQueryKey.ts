import type { GetSettlementList } from './type';

const SettlementQueryKey = {
  all: () => ['settlement'] as const,
  lists: () => [...SettlementQueryKey.all(), 'list'] as const,
  list: (params: GetSettlementList['request']) => [...SettlementQueryKey.all(), 'list', params] as const,
  detail: (meetingId: number) => [...SettlementQueryKey.all(), 'detail', meetingId] as const,
  attendees: (meetingId: number, roundId: number) =>
    [...SettlementQueryKey.all(), 'attendees', meetingId, roundId] as const,
};

export default SettlementQueryKey;

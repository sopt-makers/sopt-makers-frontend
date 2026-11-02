const SettlementQueryKey = {
  all: () => ['settlement'] as const,
  detail: (meetingId: number) => [...SettlementQueryKey.all(), 'detail', meetingId] as const,
  attendees: (meetingId: number, roundId: number) =>
    [...SettlementQueryKey.all(), 'attendees', meetingId, roundId] as const,
};

export default SettlementQueryKey;

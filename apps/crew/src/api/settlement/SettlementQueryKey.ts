const SettlementQueryKey = {
  all: () => ['settlement'] as const,
  lists: () => [...SettlementQueryKey.all(), 'list'] as const,
  detail: (meetingId: number) => [...SettlementQueryKey.all(), 'detail', meetingId] as const,
};

export default SettlementQueryKey;

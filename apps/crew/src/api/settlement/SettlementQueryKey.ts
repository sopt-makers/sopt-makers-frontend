const SettlementQueryKey = {
  all: () => ['settlement'] as const,
  detail: (meetingId: number) => [...SettlementQueryKey.all(), 'detail', meetingId] as const,
};

export default SettlementQueryKey;

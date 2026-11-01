const SettlementQueryKey = {
  all: () => ['settlement'] as const,
  detail: (meetingId: number) => [...SettlementQueryKey.all(), 'detail', meetingId] as const,
  payerRequests: (meetingId: number) => [...SettlementQueryKey.all(), 'payerRequests', meetingId] as const,
};

export default SettlementQueryKey;

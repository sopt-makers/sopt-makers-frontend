const FlashQueryKey = {
  all: () => ['flash'] as const,
  detail: (meetingId: number) => [...FlashQueryKey.all(), meetingId] as const,
};

export default FlashQueryKey;

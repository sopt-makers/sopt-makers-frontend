import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSettlement, putSettlement } from '.';
import SettlementQueryKey from './SettlementQueryKey';
import type { PutSettlement } from './type';

export const usePostSettlementMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSettlement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.lists() }),
  });
};

export const usePutSettlementMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ meetingId, data }: { meetingId: number; data: PutSettlement['request'] }) =>
      putSettlement(meetingId, data),

    onSuccess: (_, { meetingId }) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.lists() }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
      ]),
  });
};

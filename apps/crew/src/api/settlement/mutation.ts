import { useMutation, useQueryClient } from '@tanstack/react-query';

import { respondToSettlementPayerRequest } from '.';
import SettlementQueryKey from './SettlementQueryKey';
import type { SettlementPayerRequestAction } from './type';

export const useRespondToSettlementPayerRequestMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SettlementPayerRequestAction) => respondToSettlementPayerRequest({ meetingId, ...request }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.payerRequests(meetingId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
      ]);
    },
  });
};

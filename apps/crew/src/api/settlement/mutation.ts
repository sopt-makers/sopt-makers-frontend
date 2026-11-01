import { useMutation, useQueryClient } from '@tanstack/react-query';

import { endSettlement } from '.';
import SettlementQueryKey from './SettlementQueryKey';

export const useEndSettlementMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => endSettlement(meetingId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  applyRoundAttendance,
  cancelRoundAttendance,
  closeSettlementRound,
  deleteSettlement,
  deleteSettlementRound,
  endSettlement,
  postSettlement,
  putSettlement,
  requestRoundPayer,
} from '.';
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

export const useEndSettlementMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => endSettlement(meetingId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

export const useDeleteSettlementMutation = (meetingId: number) =>
  useMutation({ mutationFn: () => deleteSettlement(meetingId) });

export const useDeleteSettlementRoundMutation = (meetingId: number, roundId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteSettlementRound(meetingId, roundId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

export const useCloseSettlementRoundMutation = (meetingId: number, roundId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => closeSettlementRound(meetingId, roundId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

export const useRoundAttendanceMutation = (meetingId: number, roundId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isAttending: boolean) =>
      isAttending ? cancelRoundAttendance(meetingId, roundId) : applyRoundAttendance(meetingId, roundId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

export const useRequestRoundPayerMutation = (meetingId: number, roundId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requestRoundPayer(meetingId, roundId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

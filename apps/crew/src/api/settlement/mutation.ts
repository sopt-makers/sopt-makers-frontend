import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  addSettlementAttendee,
  applyRoundAttendance,
  cancelRoundAttendance,
  closeSettlementRound,
  deleteSettlement,
  deleteSettlementAttendee,
  deleteSettlementRound,
  endSettlement,
  getSettlementAttendeesCsv,
  postSettlement,
  postSettlementRound,
  putSettlement,
  putSettlementRound,
  requestRoundPayer,
  respondToSettlementPayerRequest,
  revokeSettlementPayer,
} from '.';
import SettlementQueryKey from './SettlementQueryKey';
import type {
  PostSettlementRound,
  PutSettlement,
  PutSettlementRound,
  SettlementAddAttendee,
  SettlementDeleteAttendee,
  SettlementPayerRequestAction,
  SettlementPayerRevoke,
} from './type';

export const useRespondToSettlementPayerRequestMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SettlementPayerRequestAction) => respondToSettlementPayerRequest({ meetingId, ...request }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.payerRequests(meetingId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.payers(meetingId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
      ]);
    },
  });
};

export const useRevokeSettlementPayerMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SettlementPayerRevoke) => revokeSettlementPayer({ meetingId, ...request }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.payers(meetingId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.payerRequests(meetingId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
      ]),
  });
};

export const useDownloadSettlementAttendeesCsvMutation = () =>
  useMutation({
    mutationFn: getSettlementAttendeesCsv,
    onSuccess: ({ url }) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'attendees.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });

export const useAddSettlementAttendeeMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SettlementAddAttendee) => addSettlementAttendee({ meetingId, ...request }),
    onSuccess: async (_, { roundId }) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.attendees(meetingId, roundId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.attendance(meetingId, roundId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
      ]),
  });
};

export const useDeleteSettlementAttendeeMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SettlementDeleteAttendee) => deleteSettlementAttendee({ meetingId, ...request }),
    onSuccess: async (_, { roundId }) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.attendees(meetingId, roundId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.attendance(meetingId, roundId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
      ]),
  });
};

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

export const usePostSettlementRoundMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ meetingId, data }: { meetingId: number; data: PostSettlementRound['request'] }) =>
      postSettlementRound(meetingId, data),
    onSuccess: (_, { meetingId }) => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

export const usePutSettlementRoundMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      roundId,
      data,
    }: {
      meetingId: number;
      roundId: number;
      data: PutSettlementRound['request'];
    }) => putSettlementRound(meetingId, roundId, data),
    onSuccess: (_, { meetingId }) => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

export const useEndSettlementMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => endSettlement(meetingId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

export const useDeleteSettlementMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSettlement,
    onSuccess: (_, meetingId) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.lists() }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId), refetchType: 'none' }),
      ]),
  });
};

export const useDeleteSettlementRoundMutation = ({ refetchDetail = true }: { refetchDetail?: boolean } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ meetingId, roundId }: { meetingId: number; roundId: number }) =>
      deleteSettlementRound(meetingId, roundId),
    onSuccess: (_, { meetingId }) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.lists() }),
        queryClient.invalidateQueries({
          queryKey: SettlementQueryKey.detail(meetingId),
          refetchType: refetchDetail ? 'active' : 'none',
        }),
      ]),
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
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.attendees(meetingId, roundId) }),
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.attendance(meetingId, roundId) }),
      ]),
  });
};

export const useRequestRoundPayerMutation = (meetingId: number, roundId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => requestRoundPayer(meetingId, roundId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
  });
};

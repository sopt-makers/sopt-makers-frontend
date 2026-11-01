import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  addSettlementAttendee,
  deleteSettlementAttendee,
  getSettlementAttendeesCsv,
  respondToSettlementPayerRequest,
} from '.';
import SettlementQueryKey from './SettlementQueryKey';
import type { SettlementAddAttendee, SettlementDeleteAttendee, SettlementPayerRequestAction } from './type';

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
        queryClient.invalidateQueries({ queryKey: SettlementQueryKey.detail(meetingId) }),
      ]),
  });
};

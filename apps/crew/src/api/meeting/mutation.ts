import MeetingQueryKey from '@api/meeting/MeetingQueryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FormType } from '@type/form';
import alertErrorMessage from '@util/alertErrorMessage';
import { AxiosError } from 'axios';

import {
  deleteMeeting,
  deleteMeetingApplication,
  getMeetingMemberCSV,
  patchMeeting,
  postEventApplication,
  postMeeting,
  postMeetingApplication,
  updateMeetingApplication,
} from '.';
import { serializeMeetingData, serializeUpdateMeetingData } from './serialize';

export const useDeleteMeetingMutation = () => {
  return useMutation({
    mutationFn: deleteMeeting,
  });
};

export const usePostMeetingApplicationMutation = () => {
  return useMutation({
    mutationFn: postMeetingApplication,
  });
};

export const usePostMeetingMutation = (meetingDemandId?: number) => {
  return useMutation({
    mutationFn: (formData: FormType) => postMeeting(serializeMeetingData(formData, meetingDemandId)),
    onError: () => {
      alert('모임을 개설하지 못했습니다.');
    },
  });
};

export const usePatchMeetingMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormType) => patchMeeting(meetingId, serializeUpdateMeetingData(formData)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MeetingQueryKey.detail(meetingId),
      });
    },
  });
};

export const useDeleteMeetingApplicationMutation = () => {
  return useMutation({
    mutationFn: deleteMeetingApplication,
  });
};

export const useUpdateMeetingApplicationMutation = (meetingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMeetingApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        // TODO: queryKey 타입 문제 해결 후 주석 해제
        // queryKey: MeetingQueryKey.memberList(meetingId),
        queryKey: ['meeting', 'memberList', meetingId],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        alertErrorMessage(error);
      }
    },
  });
};

export const usePostEventApplicationMutation = () => {
  return useMutation({
    mutationFn: postEventApplication,
  });
};

export const useDownloadMeetingMemberCSVMutation = () => {
  return useMutation({
    mutationFn: getMeetingMemberCSV,
    onSuccess: ({ data }) => {
      const url = data.url;
      const a = document.createElement('a');
      a.href = url;
      a.download = 'groupMember.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  });
};

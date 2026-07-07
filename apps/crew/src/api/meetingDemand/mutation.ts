import { useToast } from '@sopt-makers/ui';
import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMeetingDemand, deleteMeetingDemand, reportMeetingDemand, switchMeetingDemandWait } from '.';
import MeetingDemandQueryKey from './MeetingDemandQueryKey';
import type { GetMeetingDemandResponse, GetMeetingDemandsResponse } from './type';

export const useCreateMeetingDemandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMeetingDemand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingDemandQueryKey.lists() });
    },
  });
};

export const useSwitchMeetingDemandWaitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetingDemandId: number) => switchMeetingDemandWait({ meetingDemandId }),
    onSuccess: (response, meetingDemandId) => {
      queryClient.setQueriesData<InfiniteData<GetMeetingDemandsResponse>>(
        { queryKey: MeetingDemandQueryKey.lists() },
        (currentData) => {
          if (!currentData) return currentData;

          return {
            ...currentData,
            pages: currentData.pages.map((page) => ({
              ...page,
              meetingDemands: page.meetingDemands.map((meetingDemand) =>
                meetingDemand.id === meetingDemandId ? { ...meetingDemand, ...response } : meetingDemand,
              ),
            })),
          };
        },
      );

      queryClient.setQueryData<GetMeetingDemandResponse>(
        MeetingDemandQueryKey.detail(meetingDemandId),
        (currentData) => (currentData ? { ...currentData, ...response } : currentData),
      );
    },
  });
};

export const useReportMeetingDemandMutation = () => {
  const { open } = useToast();

  return useMutation({
    mutationFn: (meetingDemandId: number) => reportMeetingDemand({ meetingDemandId }),
    onSuccess: () => {
      open({ icon: 'success', content: '모임 제안을 신고했습니다.' });
    },
    onError: () => {
      open({ icon: 'error', content: '이미 신고한 모임 제안입니다.' });
    },
  });
};

export const useDeleteMeetingDemandMutation = () => {
  return useMutation({
    mutationFn: (meetingDemandId: number) => deleteMeetingDemand({ meetingDemandId }),
  });
};

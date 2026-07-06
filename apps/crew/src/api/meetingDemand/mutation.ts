import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMeetingDemand, switchMeetingDemandWait } from '.';
import MeetingDemandQueryKey from './MeetingDemandQueryKey';
import type { GetMeetingDemandsResponse } from './type';

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
    },
  });
};

import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { getMeetingDemand, getMeetingDemands, getOpenedMeetings } from '.';
import MeetingDemandQueryKey from './MeetingDemandQueryKey';
import type {
  GetMeetingDemandResponse,
  GetMeetingDemandsRequest,
  GetMeetingDemandsResponse,
  GetOpenedMeetingsResponse,
} from './type';

const MEETING_DEMANDS_PER_PAGE = 3;

export const useMeetingDemandListInfiniteQueryOption = () => {
  const params: GetMeetingDemandsRequest = {
    take: MEETING_DEMANDS_PER_PAGE,
  };

  return infiniteQueryOptions<GetMeetingDemandsResponse>({
    queryKey: MeetingDemandQueryKey.list(params),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMeetingDemands({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => (lastPage.meta.hasNextPage ? allPages.length + 1 : undefined),
  });
};

export const useMeetingDemandQueryOption = (meetingDemandId: number) => {
  return queryOptions<GetMeetingDemandResponse>({
    queryKey: MeetingDemandQueryKey.detail(meetingDemandId),
    queryFn: () => getMeetingDemand({ meetingDemandId }),
    enabled: !!meetingDemandId,
  });
};

export const useOpenedMeetingsQueryOption = (meetingDemandId: number) => {
  return queryOptions<GetOpenedMeetingsResponse>({
    queryKey: MeetingDemandQueryKey.openedMeetings(meetingDemandId),
    queryFn: () => getOpenedMeetings({ meetingDemandId }),
    enabled: !!meetingDemandId,
  });
};

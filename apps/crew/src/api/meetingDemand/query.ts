import { infiniteQueryOptions } from '@tanstack/react-query';

import { getMeetingDemands } from '.';
import MeetingDemandQueryKey from './MeetingDemandQueryKey';
import type { GetMeetingDemandsRequest, GetMeetingDemandsResponse } from './type';

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

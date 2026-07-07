import { queryOptions } from '@tanstack/react-query';

import { getMeetingDemandComments } from '.';
import MeetingDemandCommentQueryKey from './MeetingDemandCommentQueryKey';
import type { GetMeetingDemandCommentsResponse } from './type';

export const useMeetingDemandCommentsQueryOption = (meetingDemandId: number) => {
  return queryOptions<GetMeetingDemandCommentsResponse>({
    queryKey: MeetingDemandCommentQueryKey.list(meetingDemandId),
    queryFn: () => getMeetingDemandComments({ meetingDemandId }),
    enabled: !!meetingDemandId,
  });
};

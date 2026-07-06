import type { GetMeetingDemandsRequest } from './type';

const MeetingDemandQueryKey = {
  all: () => ['meetingDemand'] as const,
  lists: () => [...MeetingDemandQueryKey.all(), 'list'] as const,
  list: (params: GetMeetingDemandsRequest) => [...MeetingDemandQueryKey.lists(), params] as const,
};

export default MeetingDemandQueryKey;

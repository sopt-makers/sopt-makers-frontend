import type { GetMeetingDemandsRequest, GetOpenedMeetingsRequest } from './type';

const MeetingDemandQueryKey = {
  all: () => ['meetingDemand'] as const,
  lists: () => [...MeetingDemandQueryKey.all(), 'list'] as const,
  list: (params: GetMeetingDemandsRequest) => [...MeetingDemandQueryKey.lists(), params] as const,
  detail: (meetingDemandId: number) => [...MeetingDemandQueryKey.all(), 'detail', meetingDemandId] as const,
  openedMeetingsLists: (meetingDemandId: number) =>
    [...MeetingDemandQueryKey.all(), 'openedMeetings', meetingDemandId] as const,
  openedMeetings: (meetingDemandId: number, params?: Omit<GetOpenedMeetingsRequest, 'meetingDemandId'>) =>
    [...MeetingDemandQueryKey.openedMeetingsLists(meetingDemandId), params] as const,
};

export default MeetingDemandQueryKey;

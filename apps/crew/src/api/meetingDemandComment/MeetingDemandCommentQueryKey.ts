import type { GetMeetingDemandCommentsRequest } from './type';

const MeetingDemandCommentQueryKey = {
  all: () => ['meetingDemandComment'] as const,
  lists: (meetingDemandId: number) => [...MeetingDemandCommentQueryKey.all(), 'list', meetingDemandId] as const,
  list: (meetingDemandId: number, params?: Omit<GetMeetingDemandCommentsRequest, 'meetingDemandId'>) =>
    [...MeetingDemandCommentQueryKey.lists(meetingDemandId), params] as const,
};

export default MeetingDemandCommentQueryKey;

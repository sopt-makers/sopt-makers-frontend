import { api } from '@api/index';

import type {
  CreateMeetingDemandRequest,
  CreateMeetingDemandResponse,
  GetMeetingDemandsRequest,
  GetMeetingDemandsResponse,
  SwitchMeetingDemandWaitRequest,
  SwitchMeetingDemandWaitResponse,
} from './type';

const MEETING_DEMAND_ENDPOINT = '/meeting-demand/v2';
const getMeetingDemandWaitEndpoint = (meetingDemandId: number) => `${MEETING_DEMAND_ENDPOINT}/${meetingDemandId}/wait`;

export const getMeetingDemands = async (params: GetMeetingDemandsRequest) => {
  return (await api.get<GetMeetingDemandsResponse>(MEETING_DEMAND_ENDPOINT, { params })).data;
};

export const createMeetingDemand = async (body: CreateMeetingDemandRequest) => {
  return (await api.post<CreateMeetingDemandResponse>(MEETING_DEMAND_ENDPOINT, body)).data;
};

export const switchMeetingDemandWait = async ({ meetingDemandId }: SwitchMeetingDemandWaitRequest) => {
  return (await api.post<SwitchMeetingDemandWaitResponse>(getMeetingDemandWaitEndpoint(meetingDemandId))).data;
};

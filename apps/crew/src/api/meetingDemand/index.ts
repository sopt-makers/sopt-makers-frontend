import { api } from '@api/index';

import type {
  CreateMeetingDemandRequest,
  CreateMeetingDemandResponse,
  DeleteMeetingDemandRequest,
  GetMeetingDemandRequest,
  GetMeetingDemandResponse,
  GetMeetingDemandsRequest,
  GetMeetingDemandsResponse,
  GetOpenedMeetingsRequest,
  GetOpenedMeetingsResponse,
  ReportMeetingDemandRequest,
  ReportMeetingDemandResponse,
  SwitchMeetingDemandWaitRequest,
  SwitchMeetingDemandWaitResponse,
} from './type';

const MEETING_DEMAND_ENDPOINT = '/meeting-demand/v2';
const getMeetingDemandDetailEndpoint = (meetingDemandId: number) => `${MEETING_DEMAND_ENDPOINT}/${meetingDemandId}`;
const getMeetingDemandWaitEndpoint = (meetingDemandId: number) => `${MEETING_DEMAND_ENDPOINT}/${meetingDemandId}/wait`;
const getMeetingDemandReportEndpoint = (meetingDemandId: number) =>
  `${MEETING_DEMAND_ENDPOINT}/${meetingDemandId}/report`;
const getMeetingDemandMeetingsEndpoint = (meetingDemandId: number) =>
  `${MEETING_DEMAND_ENDPOINT}/${meetingDemandId}/meetings`;

export const getMeetingDemands = async (params: GetMeetingDemandsRequest) => {
  return (await api.get<GetMeetingDemandsResponse>(MEETING_DEMAND_ENDPOINT, { params })).data;
};

export const createMeetingDemand = async (body: CreateMeetingDemandRequest) => {
  return (await api.post<CreateMeetingDemandResponse>(MEETING_DEMAND_ENDPOINT, body)).data;
};

export const switchMeetingDemandWait = async ({ meetingDemandId }: SwitchMeetingDemandWaitRequest) => {
  return (await api.post<SwitchMeetingDemandWaitResponse>(getMeetingDemandWaitEndpoint(meetingDemandId))).data;
};

export const getMeetingDemand = async ({ meetingDemandId }: GetMeetingDemandRequest) => {
  return (await api.get<GetMeetingDemandResponse>(getMeetingDemandDetailEndpoint(meetingDemandId))).data;
};

export const deleteMeetingDemand = async ({ meetingDemandId }: DeleteMeetingDemandRequest) => {
  return (await api.delete(getMeetingDemandDetailEndpoint(meetingDemandId))).data;
};

export const reportMeetingDemand = async ({ meetingDemandId }: ReportMeetingDemandRequest) => {
  return (await api.post<ReportMeetingDemandResponse>(getMeetingDemandReportEndpoint(meetingDemandId))).data;
};

export const getOpenedMeetings = async ({ meetingDemandId, ...params }: GetOpenedMeetingsRequest) => {
  return (await api.get<GetOpenedMeetingsResponse>(getMeetingDemandMeetingsEndpoint(meetingDemandId), { params })).data;
};

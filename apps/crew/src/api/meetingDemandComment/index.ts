import { api } from '@api/index';

import type {
  CreateMeetingDemandCommentRequest,
  CreateMeetingDemandCommentResponse,
  DeleteMeetingDemandCommentRequest,
  GetMeetingDemandCommentsRequest,
  GetMeetingDemandCommentsResponse,
  ReportMeetingDemandCommentRequest,
  ReportMeetingDemandCommentResponse,
  SwitchMeetingDemandCommentLikeRequest,
  SwitchMeetingDemandCommentLikeResponse,
} from './type';

const MEETING_DEMAND_COMMENT_ENDPOINT = '/meeting-demand/v2/comments';
const getMeetingDemandCommentsEndpoint = (meetingDemandId: number) => `/meeting-demand/v2/${meetingDemandId}/comments`;
const getMeetingDemandCommentLikeEndpoint = (commentId: number) =>
  `${MEETING_DEMAND_COMMENT_ENDPOINT}/${commentId}/like`;
const getMeetingDemandCommentReportEndpoint = (commentId: number) =>
  `${MEETING_DEMAND_COMMENT_ENDPOINT}/${commentId}/report`;

export const getMeetingDemandComments = async ({ meetingDemandId, ...params }: GetMeetingDemandCommentsRequest) => {
  return (
    await api.get<GetMeetingDemandCommentsResponse>(getMeetingDemandCommentsEndpoint(meetingDemandId), { params })
  ).data;
};

export const createMeetingDemandComment = async ({ meetingDemandId, ...body }: CreateMeetingDemandCommentRequest) => {
  return (await api.post<CreateMeetingDemandCommentResponse>(getMeetingDemandCommentsEndpoint(meetingDemandId), body))
    .data;
};

export const deleteMeetingDemandComment = async ({ commentId }: DeleteMeetingDemandCommentRequest) => {
  return (await api.delete(`${MEETING_DEMAND_COMMENT_ENDPOINT}/${commentId}`)).data;
};

export const switchMeetingDemandCommentLike = async ({ commentId }: SwitchMeetingDemandCommentLikeRequest) => {
  return (await api.post<SwitchMeetingDemandCommentLikeResponse>(getMeetingDemandCommentLikeEndpoint(commentId))).data;
};

export const reportMeetingDemandComment = async ({ commentId }: ReportMeetingDemandCommentRequest) => {
  return (await api.post<ReportMeetingDemandCommentResponse>(getMeetingDemandCommentReportEndpoint(commentId))).data;
};

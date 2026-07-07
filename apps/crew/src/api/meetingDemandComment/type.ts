import type { paths } from '@/__generated__/schema2';

export type GetMeetingDemandCommentsRequest =
  paths['/meeting-demand/v2/{meetingDemandId}/comments']['get']['parameters']['path'] &
    NonNullable<paths['/meeting-demand/v2/{meetingDemandId}/comments']['get']['parameters']['query']>;

export type GetMeetingDemandCommentsResponse =
  paths['/meeting-demand/v2/{meetingDemandId}/comments']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type CreateMeetingDemandCommentRequest =
  paths['/meeting-demand/v2/{meetingDemandId}/comments']['post']['parameters']['path'] &
    paths['/meeting-demand/v2/{meetingDemandId}/comments']['post']['requestBody']['content']['application/json;charset=UTF-8'];

export type CreateMeetingDemandCommentResponse =
  paths['/meeting-demand/v2/{meetingDemandId}/comments']['post']['responses']['200']['content']['application/json;charset=UTF-8'];

export type DeleteMeetingDemandCommentRequest =
  paths['/meeting-demand/v2/comments/{commentId}']['delete']['parameters']['path'];

export type SwitchMeetingDemandCommentLikeRequest =
  paths['/meeting-demand/v2/comments/{commentId}/like']['post']['parameters']['path'];

export type SwitchMeetingDemandCommentLikeResponse =
  paths['/meeting-demand/v2/comments/{commentId}/like']['post']['responses']['200']['content']['application/json;charset=UTF-8'];

export type ReportMeetingDemandCommentRequest =
  paths['/meeting-demand/v2/comments/{commentId}/report']['post']['parameters']['path'];

export type ReportMeetingDemandCommentResponse =
  paths['/meeting-demand/v2/comments/{commentId}/report']['post']['responses']['200']['content']['application/json;charset=UTF-8'];

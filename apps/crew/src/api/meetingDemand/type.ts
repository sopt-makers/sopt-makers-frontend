import type { paths } from '@/__generated__/schema2';

export type GetMeetingDemandsRequest = NonNullable<paths['/meeting-demand/v2']['get']['parameters']['query']>;

export type GetMeetingDemandsResponse =
  paths['/meeting-demand/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type CreateMeetingDemandRequest =
  paths['/meeting-demand/v2']['post']['requestBody']['content']['application/json;charset=UTF-8'];

export type CreateMeetingDemandResponse =
  paths['/meeting-demand/v2']['post']['responses']['200']['content']['application/json;charset=UTF-8'];

export type SwitchMeetingDemandWaitRequest =
  paths['/meeting-demand/v2/{meetingDemandId}/wait']['post']['parameters']['path'];

export type SwitchMeetingDemandWaitResponse =
  paths['/meeting-demand/v2/{meetingDemandId}/wait']['post']['responses']['200']['content']['application/json;charset=UTF-8'];

export type ReportMeetingDemandRequest =
  paths['/meeting-demand/v2/{meetingDemandId}/report']['post']['parameters']['path'];

export type ReportMeetingDemandResponse =
  paths['/meeting-demand/v2/{meetingDemandId}/report']['post']['responses']['200']['content']['application/json;charset=UTF-8'];

export type GetMeetingDemandRequest = paths['/meeting-demand/v2/{meetingDemandId}']['get']['parameters']['path'];

export type GetMeetingDemandResponse =
  paths['/meeting-demand/v2/{meetingDemandId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type DeleteMeetingDemandRequest = paths['/meeting-demand/v2/{meetingDemandId}']['delete']['parameters']['path'];

export type GetOpenedMeetingsRequest =
  paths['/meeting-demand/v2/{meetingDemandId}/meetings']['get']['parameters']['path'] &
    NonNullable<paths['/meeting-demand/v2/{meetingDemandId}/meetings']['get']['parameters']['query']>;

export type GetOpenedMeetingsResponse =
  paths['/meeting-demand/v2/{meetingDemandId}/meetings']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

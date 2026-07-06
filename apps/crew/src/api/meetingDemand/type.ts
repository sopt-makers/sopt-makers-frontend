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

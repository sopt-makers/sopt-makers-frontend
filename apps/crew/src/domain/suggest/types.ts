import type { paths } from '@/__generated__/schema2';

export type MeetingDemandPageData =
  paths['/meeting-demand/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type MeetingDemandData = MeetingDemandPageData['meetingDemands'][number];

export type CreateMeetingDemandRequest =
  paths['/meeting-demand/v2']['post']['requestBody']['content']['application/json;charset=UTF-8'];

import type { MeetingData } from '@api/meeting/type';

import type { components, paths } from '@/__generated__/schema';

export type SettlementPart = MeetingData['joinableParts'][number];
export type RoundType = components['schemas']['DiningV2RoundDto'];

type SettlementDetailResponse =
  paths['/dining/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type SettlementDetail = SettlementDetailResponse &
  Required<Pick<SettlementDetailResponse, 'diningDate' | 'leader'>>;

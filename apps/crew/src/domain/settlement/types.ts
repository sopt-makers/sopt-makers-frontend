import type { paths } from '@/__generated__/schema';

type SettlementDetailResponse =
  paths['/dining/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type SettlementDetail = SettlementDetailResponse &
  Required<Pick<SettlementDetailResponse, 'diningDate' | 'leader'>>;

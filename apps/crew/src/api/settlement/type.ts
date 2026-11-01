import type { components, paths } from '@/__generated__/schema';

export type SettlementCardItem = components['schemas']['DiningV2DiningCardDto'];
export type SettlementListTab = NonNullable<NonNullable<paths['/dining/v2']['get']['parameters']['query']>['tab']>;
export type SettlementRequest = components['schemas']['DiningV2CreateAndUpdateDiningBodyDto'];
export type SettlementRoundRequest = components['schemas']['DiningV2CreateAndUpdateRoundBodyDto'];

export type SettlementDetailResponse = components['schemas']['DiningV2GetDiningDetailResponseDto'];
export type SettlementPayerRequestsResponse = components['schemas']['DiningV2GetPayerRequestsResponseDto'];

type PayerRequestPath =
  paths['/dining/v2/{meetingId}/rounds/{roundId}/payer-requests/{requesterUserId}/approve']['post']['parameters']['path'];
export type SettlementPayerRequestAction = Pick<PayerRequestPath, 'roundId' | 'requesterUserId'> & {
  action: 'approve' | 'reject';
};

export type SettlementAttendeesCsvRequest =
  paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees/csv']['get']['parameters']['path'];
export type SettlementAttendeesCsvResponse = components['schemas']['DiningV2GetAttendeesCsvResponseDto'];

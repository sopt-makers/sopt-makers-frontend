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

type SettlementAttendeesPath = paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees']['get']['parameters']['path'];
type SettlementAttendeesQuery = NonNullable<
  paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees']['get']['parameters']['query']
>;
export type SettlementAttendeesRequest = SettlementAttendeesPath & SettlementAttendeesQuery;
export type SettlementAttendeesResponse = components['schemas']['DiningV2GetAttendeeManagementResponseDto'];

export type SettlementAddAttendeeRequest =
  paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees']['post']['parameters']['path'] &
    paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees']['post']['requestBody']['content']['application/json;charset=UTF-8'];

export type SettlementDeleteAttendeeRequest =
  paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees/{attendeeUserId}']['delete']['parameters']['path'];

export type SettlementAddAttendee = Pick<SettlementAddAttendeeRequest, 'roundId' | 'userId'>;
export type SettlementDeleteAttendee = Pick<SettlementDeleteAttendeeRequest, 'roundId' | 'attendeeUserId'>;

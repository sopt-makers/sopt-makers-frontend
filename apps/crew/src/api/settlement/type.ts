import type { components, paths } from '@/__generated__/schema';

export type GetSettlementList = {
  request: NonNullable<paths['/dining/v2']['get']['parameters']['query']>;
  response: paths['/dining/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type SettlementListParams = GetSettlementList['request'] &
  Required<Pick<GetSettlementList['request'], 'tab' | 'page' | 'take'>>;

export type SettlementCardItem = components['schemas']['DiningV2DiningCardDto'];
export type SettlementListTab = NonNullable<GetSettlementList['request']['tab']>;
export type SettlementListStatus = NonNullable<GetSettlementList['request']['status']>;
export type SettlementListPart = NonNullable<GetSettlementList['request']['part']>;
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

export type RoundAttendanceResponse = components['schemas']['DiningV2GetAttendeesResponseDto'];

export type PostSettlement = {
  request: SettlementRequest;
  response: paths['/dining/v2']['post']['responses']['201']['content']['application/json;charset=UTF-8'];
};

export type PutSettlement = {
  request: SettlementRequest;
  response: void;
};

export type PostSettlementRound = {
  request: SettlementRoundRequest;
  response: paths['/dining/v2/{meetingId}/rounds']['post']['responses']['201']['content']['application/json;charset=UTF-8'];
};

export type PutSettlementRound = {
  request: SettlementRoundRequest;
  response: void;
};

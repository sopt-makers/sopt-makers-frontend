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

export type GetSettlementDetail = {
  request: paths['/dining/v2/{meetingId}']['get']['parameters']['path'];
  response: components['schemas']['DiningV2GetDiningDetailResponseDto'];
};

export type GetSettlementPayerRequests = {
  request: paths['/dining/v2/{meetingId}/payer-requests']['get']['parameters']['path'];
  response: components['schemas']['DiningV2GetPayerRequestsResponseDto'];
};

export type GetSettlementPayers = {
  request: paths['/dining/v2/{meetingId}/payers']['get']['parameters']['path'];
  response: components['schemas']['DiningV2GetApprovedPayersResponseDto'];
};

export type RevokeSettlementPayer = {
  request: paths['/dining/v2/{meetingId}/rounds/{roundId}/payer-requests/{requesterUserId}/revoke']['post']['parameters']['path'];
  response: void;
};
export type SettlementPayerRevoke = Omit<RevokeSettlementPayer['request'], 'meetingId'>;

type PayerRequestPath =
  paths['/dining/v2/{meetingId}/rounds/{roundId}/payer-requests/{requesterUserId}/approve']['post']['parameters']['path'];
export type RespondToSettlementPayerRequest = {
  request: PayerRequestPath & { action: 'approve' | 'reject' };
  response: void;
};
export type SettlementPayerRequestAction = Omit<RespondToSettlementPayerRequest['request'], 'meetingId'>;

export type GetSettlementAttendeesCsv = {
  request: paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees/csv']['get']['parameters']['path'];
  response: components['schemas']['DiningV2GetAttendeesCsvResponseDto'];
};

export type GetSettlementAttendees = {
  request: paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees']['get']['parameters']['path'] &
    NonNullable<paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees']['get']['parameters']['query']>;
  response: components['schemas']['DiningV2GetAttendeeManagementResponseDto'];
};

export type PostSettlementAttendee = {
  request: paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees']['post']['parameters']['path'] &
    paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees']['post']['requestBody']['content']['application/json;charset=UTF-8'];
  response: void;
};

export type DeleteSettlementAttendee = {
  request: paths['/dining/v2/{meetingId}/rounds/{roundId}/attendees/{attendeeUserId}']['delete']['parameters']['path'];
  response: void;
};

export type SettlementAddAttendee = Pick<PostSettlementAttendee['request'], 'roundId' | 'userId'>;
export type SettlementDeleteAttendee = Pick<DeleteSettlementAttendee['request'], 'roundId' | 'attendeeUserId'>;

export type GetRoundAttendance = {
  request: paths['/dining/v2/{meetingId}/rounds/{roundId}/attendance/attendees']['get']['parameters']['path'];
  response: components['schemas']['DiningV2GetAttendeesResponseDto'];
};

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

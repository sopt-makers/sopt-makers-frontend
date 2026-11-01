import { api } from '@api/index';

import type {
  SettlementAddAttendeeRequest,
  SettlementAttendeesCsvRequest,
  SettlementAttendeesCsvResponse,
  SettlementAttendeesRequest,
  SettlementAttendeesResponse,
  SettlementDeleteAttendeeRequest,
  SettlementDetailResponse,
  SettlementPayerRequestAction,
  SettlementPayerRequestsResponse,
} from './type';

export const getSettlementDetail = async (meetingId: number): Promise<SettlementDetailResponse> =>
  (await api.get<SettlementDetailResponse>(`/dining/v2/${meetingId}`)).data;

export const getSettlementPayerRequests = async (meetingId: number): Promise<SettlementPayerRequestsResponse> =>
  (await api.get<SettlementPayerRequestsResponse>(`/dining/v2/${meetingId}/payer-requests`)).data;

export const respondToSettlementPayerRequest = async ({
  meetingId,
  roundId,
  requesterUserId,
  action,
}: SettlementPayerRequestAction & { meetingId: number }): Promise<void> => {
  await api.post(`/dining/v2/${meetingId}/rounds/${roundId}/payer-requests/${requesterUserId}/${action}`);
};

export const getSettlementAttendeesCsv = async ({
  meetingId,
  roundId,
}: SettlementAttendeesCsvRequest): Promise<SettlementAttendeesCsvResponse> =>
  (await api.get<SettlementAttendeesCsvResponse>(`/dining/v2/${meetingId}/rounds/${roundId}/attendees/csv`)).data;

export const getSettlementAttendees = async ({
  meetingId,
  roundId,
  ...params
}: SettlementAttendeesRequest): Promise<SettlementAttendeesResponse> =>
  (await api.get<SettlementAttendeesResponse>(`/dining/v2/${meetingId}/rounds/${roundId}/attendees`, { params })).data;

export const addSettlementAttendee = async ({
  meetingId,
  roundId,
  userId,
}: SettlementAddAttendeeRequest): Promise<void> => {
  await api.post(`/dining/v2/${meetingId}/rounds/${roundId}/attendees`, { userId });
};

export const deleteSettlementAttendee = async ({
  meetingId,
  roundId,
  attendeeUserId,
}: SettlementDeleteAttendeeRequest): Promise<void> => {
  await api.delete(`/dining/v2/${meetingId}/rounds/${roundId}/attendees/${attendeeUserId}`);
};

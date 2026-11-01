import { api } from '@api/index';

import type {
  SettlementAttendeesCsvRequest,
  SettlementAttendeesCsvResponse,
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

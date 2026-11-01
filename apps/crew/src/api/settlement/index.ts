import { api } from '@api/index';

import type { SettlementAttendeesResponse, SettlementDetailResponse } from './type';

export const getSettlementDetail = async (meetingId: number): Promise<SettlementDetailResponse> =>
  (await api.get<SettlementDetailResponse>(`/dining/v2/${meetingId}`)).data;

export const getSettlementAttendees = async (
  meetingId: number,
  roundId: number,
): Promise<SettlementAttendeesResponse> =>
  (await api.get<SettlementAttendeesResponse>(`/dining/v2/${meetingId}/rounds/${roundId}/attendance/attendees`)).data;

export const endSettlement = async (meetingId: number) => {
  await api.post(`/dining/v2/${meetingId}/end`);
};

export const deleteSettlement = async (meetingId: number) => {
  await api.delete(`/dining/v2/${meetingId}`);
};

export const deleteSettlementRound = async (meetingId: number, roundId: number) => {
  await api.delete(`/dining/v2/${meetingId}/rounds/${roundId}`);
};

export const closeSettlementRound = async (meetingId: number, roundId: number) => {
  await api.post(`/dining/v2/${meetingId}/rounds/${roundId}/close`);
};

export const applyRoundAttendance = async (meetingId: number, roundId: number) => {
  await api.post(`/dining/v2/${meetingId}/rounds/${roundId}/attendance`);
};

export const cancelRoundAttendance = async (meetingId: number, roundId: number) => {
  await api.delete(`/dining/v2/${meetingId}/rounds/${roundId}/attendance`);
};

export const requestRoundPayer = async (meetingId: number, roundId: number) => {
  await api.post(`/dining/v2/${meetingId}/rounds/${roundId}/payer-requests`);
};

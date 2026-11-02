import { api } from '@api/index';

import type {
  GetSettlementList,
  PostSettlement,
  PostSettlementRound,
  PutSettlement,
  PutSettlementRound,
  SettlementAttendeesResponse,
  SettlementDetailResponse,
} from './type';

export const getSettlementList = async (params: GetSettlementList['request'], signal?: AbortSignal) => {
  return (await api.get<GetSettlementList['response']>('/dining/v2', { params, signal })).data;
};

export const getSettlementDetail = async (meetingId: number): Promise<SettlementDetailResponse> =>
  (await api.get<SettlementDetailResponse>(`/dining/v2/${meetingId}`)).data;

export const postSettlement = async (data: PostSettlement['request']) => {
  return (await api.post<PostSettlement['response']>('/dining/v2', { ...data, startTime: data.startTime || undefined }))
    .data;
};

export const putSettlement = async (meetingId: number, data: PutSettlement['request']) => {
  await api.put<PutSettlement['response']>(`/dining/v2/${meetingId}`, {
    ...data,
    startTime: data.startTime || undefined,
  });
};

export const postSettlementRound = async (meetingId: number, data: PostSettlementRound['request']) => {
  return (
    await api.post<PostSettlementRound['response']>(`/dining/v2/${meetingId}/rounds`, {
      ...data,
      startTime: data.startTime || undefined,
    })
  ).data;
};

export const putSettlementRound = async (meetingId: number, roundId: number, data: PutSettlementRound['request']) => {
  await api.put<PutSettlementRound['response']>(`/dining/v2/${meetingId}/rounds/${roundId}`, {
    ...data,
    startTime: data.startTime || undefined,
  });
};

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

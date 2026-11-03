import { api } from '@api/index';

import type {
  DeleteSettlementAttendee,
  GetRoundAttendance,
  GetSettlementAttendees,
  GetSettlementAttendeesCsv,
  GetSettlementDetail,
  GetSettlementList,
  GetSettlementPayerRequests,
  PostSettlement,
  PostSettlementAttendee,
  PostSettlementRound,
  PutSettlement,
  PutSettlementRound,
  RespondToSettlementPayerRequest,
} from './type';

export const getSettlementDetail = async (meetingId: number): Promise<GetSettlementDetail['response']> =>
  (await api.get<GetSettlementDetail['response']>(`/dining/v2/${meetingId}`)).data;

export const getSettlementPayerRequests = async (meetingId: number): Promise<GetSettlementPayerRequests['response']> =>
  (await api.get<GetSettlementPayerRequests['response']>(`/dining/v2/${meetingId}/payer-requests`)).data;

export const respondToSettlementPayerRequest = async ({
  meetingId,
  roundId,
  requesterUserId,
  action,
}: RespondToSettlementPayerRequest['request']): Promise<void> => {
  await api.post(`/dining/v2/${meetingId}/rounds/${roundId}/payer-requests/${requesterUserId}/${action}`);
};

export const getSettlementAttendeesCsv = async ({
  meetingId,
  roundId,
}: GetSettlementAttendeesCsv['request']): Promise<GetSettlementAttendeesCsv['response']> =>
  (await api.get<GetSettlementAttendeesCsv['response']>(`/dining/v2/${meetingId}/rounds/${roundId}/attendees/csv`))
    .data;

export const getSettlementAttendees = async ({
  meetingId,
  roundId,
  ...params
}: GetSettlementAttendees['request']): Promise<GetSettlementAttendees['response']> =>
  (await api.get<GetSettlementAttendees['response']>(`/dining/v2/${meetingId}/rounds/${roundId}/attendees`, { params }))
    .data;

export const addSettlementAttendee = async ({
  meetingId,
  roundId,
  userId,
}: PostSettlementAttendee['request']): Promise<void> => {
  await api.post(`/dining/v2/${meetingId}/rounds/${roundId}/attendees`, { userId });
};

export const deleteSettlementAttendee = async ({
  meetingId,
  roundId,
  attendeeUserId,
}: DeleteSettlementAttendee['request']): Promise<void> => {
  await api.delete(`/dining/v2/${meetingId}/rounds/${roundId}/attendees/${attendeeUserId}`);
};

export const getSettlementList = async (params: GetSettlementList['request'], signal?: AbortSignal) => {
  return (await api.get<GetSettlementList['response']>('/dining/v2', { params, signal })).data;
};

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

export const getRoundAttendance = async (meetingId: number, roundId: number): Promise<GetRoundAttendance['response']> =>
  (await api.get<GetRoundAttendance['response']>(`/dining/v2/${meetingId}/rounds/${roundId}/attendance/attendees`))
    .data;

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

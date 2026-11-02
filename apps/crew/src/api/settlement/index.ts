import { api } from '@api/index';

import type { PostSettlement, PutSettlement, SettlementDetailResponse } from './type';

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

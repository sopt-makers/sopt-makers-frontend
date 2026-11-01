import { api } from '@api/index';

import type { SettlementDetailResponse } from './type';

export const getSettlementDetail = async (meetingId: number): Promise<SettlementDetailResponse> =>
  (await api.get<SettlementDetailResponse>(`/dining/v2/${meetingId}`)).data;

export const endSettlement = async (meetingId: number) => {
  await api.post(`/dining/v2/${meetingId}/end`);
};

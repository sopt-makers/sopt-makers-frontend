import { api } from '@api/index';

import type { GetSettlementList } from './type';

export const getSettlementList = async (params: GetSettlementList['request'], signal?: AbortSignal) => {
  return (await api.get<GetSettlementList['response']>('/dining/v2', { params, signal })).data;
};

import { queryOptions } from '@tanstack/react-query';

import { getSettlementList } from '.';
import SettlementQueryKey from './SettlementQueryKey';
import type { SettlementListParams } from './type';

export const settlementListQueryOptions = (params: SettlementListParams) => {
  return queryOptions({
    queryKey: SettlementQueryKey.list(params),
    queryFn: ({ signal }) => getSettlementList(params, signal),
    staleTime: 30_000,
  });
};

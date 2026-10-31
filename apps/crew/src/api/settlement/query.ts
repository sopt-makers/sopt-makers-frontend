import { SETTLEMENT_PART_OPTIONS, SETTLEMENT_STATUS_OPTIONS, SETTLEMENTS_PER_PAGE } from '@domain/settlement/constant';
import { normalizeSettlementSearch } from '@domain/settlement/util';
import { useQueryString } from '@hook/queryString';
import { usePageParams, useSearchParams } from '@hook/queryString/custom';
import { queryOptions } from '@tanstack/react-query';

import { getSettlementList } from '.';
import SettlementQueryKey from './SettlementQueryKey';
import type { SettlementListParams, SettlementListTab } from './type';

export const useSettlementListQueryOption = (tab: SettlementListTab) => {
  const { value: page } = usePageParams();
  const { value: status } = useQueryString('status');
  const { value: part } = useQueryString('part');
  const { value: search } = useSearchParams();

  const params: SettlementListParams = {
    tab,
    page: Number(page),
    take: SETTLEMENTS_PER_PAGE,
    status: tab === 'ALL' ? SETTLEMENT_STATUS_OPTIONS.find(({ value }) => value === status)?.value : undefined,
    part: tab === 'ALL' ? SETTLEMENT_PART_OPTIONS.find(({ value }) => value === part)?.value : undefined,
    query: normalizeSettlementSearch(search ?? '') || undefined,
  };

  return {
    params,
    options: queryOptions({
      queryKey: SettlementQueryKey.list(params),
      queryFn: ({ signal }) => getSettlementList(params, signal),
      staleTime: 30_000,
    }),
  };
};

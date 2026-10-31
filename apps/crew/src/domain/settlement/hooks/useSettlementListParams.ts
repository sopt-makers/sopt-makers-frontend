import type {
  SettlementListParams,
  SettlementListPart,
  SettlementListStatus,
  SettlementListTab,
} from '@api/settlement/type';
import { useQueryString } from '@hook/queryString';
import { usePageParams, useSearchParams } from '@hook/queryString/custom';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { SETTLEMENT_PART_OPTIONS, SETTLEMENT_STATUS_OPTIONS, SETTLEMENTS_PER_PAGE } from '../constant';
import { normalizeSettlementSearch } from '../util';

export interface SettlementListFilters {
  tab: SettlementListTab;
  status?: SettlementListStatus;
  part?: SettlementListPart;
  search: string;
}

export const useSettlementListParams = () => {
  const router = useRouter();
  const { value: tabValue } = useQueryString('tab', 'ALL');
  const { value: pageValue } = usePageParams();
  const { value: statusValue } = useQueryString('status');
  const { value: partValue } = useQueryString('part');
  const { value: searchValue } = useSearchParams();

  const tab = tabValue === 'MY' ? 'MY' : 'ALL';
  const page = Number(pageValue);
  const status = SETTLEMENT_STATUS_OPTIONS.find(({ value }) => value === statusValue)?.value;
  const part = SETTLEMENT_PART_OPTIONS.find(({ value }) => value === partValue)?.value;
  const search = normalizeSettlementSearch(searchValue ?? '');

  const filters: SettlementListFilters = { tab, status, part, search };
  const params = {
    page,
    take: SETTLEMENTS_PER_PAGE,
    status,
    part,
    query: search || undefined,
  } satisfies Omit<SettlementListParams, 'tab'>;

  const updateQuery = useCallback(
    (updates: Record<string, string | undefined>) => {
      const nextQuery = { ...router.query };

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          nextQuery[key] = value;
        } else {
          delete nextQuery[key];
        }
      });

      const url = { pathname: router.pathname, query: nextQuery };
      const options = { shallow: true, scroll: false };

      void router.push(url, undefined, options);
    },
    [router],
  );

  const updateFilters = (updates: Partial<SettlementListFilters>) => {
    updateQuery({ ...updates, page: '1' });
  };

  const setPage = useCallback((nextPage: number) => updateQuery({ page: String(nextPage) }), [updateQuery]);

  return { filters, params, isReady: router.isReady, updateFilters, setPage };
};

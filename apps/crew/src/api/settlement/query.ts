import { SETTLEMENT_PART_OPTIONS, SETTLEMENT_STATUS_OPTIONS, SETTLEMENTS_PER_PAGE } from '@domain/settlement/constant';
import { normalizeSettlementSearch } from '@domain/settlement/util';
import { useQueryString } from '@hook/queryString';
import { usePageParams, useSearchParams } from '@hook/queryString/custom';
import { queryOptions } from '@tanstack/react-query';

import {
  getRoundAttendance,
  getSettlementAttendees,
  getSettlementDetail,
  getSettlementList,
  getSettlementPayerRequests,
} from '.';
import SettlementQueryKey from './SettlementQueryKey';
import type { GetSettlementAttendees, SettlementListParams, SettlementListTab } from './type';

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

export const useSettlementDetailQueryOption = (meetingId: number) =>
  queryOptions({
    queryKey: SettlementQueryKey.detail(meetingId),
    queryFn: () => getSettlementDetail(meetingId),
  });

export const useSettlementPayerRequestsQueryOption = (meetingId: number) =>
  queryOptions({
    queryKey: SettlementQueryKey.payerRequests(meetingId),
    queryFn: () => getSettlementPayerRequests(meetingId),
  });

export const useSettlementAttendeesQueryOption = ({
  meetingId,
  roundId,
  ...params
}: GetSettlementAttendees['request']) =>
  queryOptions({
    queryKey: SettlementQueryKey.attendeeList(meetingId, roundId, params),
    queryFn: () => getSettlementAttendees({ meetingId, roundId, ...params }),
  });

export const useRoundAttendanceQueryOption = (meetingId: number, roundId: number) =>
  queryOptions({
    queryKey: SettlementQueryKey.attendance(meetingId, roundId),
    queryFn: () => getRoundAttendance(meetingId, roundId),
    staleTime: 0,
  });

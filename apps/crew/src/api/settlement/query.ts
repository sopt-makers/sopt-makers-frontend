import { queryOptions } from '@tanstack/react-query';

import { getSettlementDetail, getSettlementPayerRequests } from '.';
import SettlementQueryKey from './SettlementQueryKey';

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

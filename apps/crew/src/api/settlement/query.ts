import { queryOptions } from '@tanstack/react-query';

import { getSettlementAttendees, getSettlementDetail, getSettlementPayerRequests } from '.';
import SettlementQueryKey from './SettlementQueryKey';
import type { SettlementAttendeesRequest } from './type';

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

export const useSettlementAttendeesQueryOption = ({ meetingId, roundId, ...params }: SettlementAttendeesRequest) =>
  queryOptions({
    queryKey: SettlementQueryKey.attendeeList(meetingId, roundId, params),
    queryFn: () => getSettlementAttendees({ meetingId, roundId, ...params }),
  });

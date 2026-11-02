import { queryOptions } from '@tanstack/react-query';

import { getSettlementAttendees, getSettlementDetail } from '.';
import SettlementQueryKey from './SettlementQueryKey';

export const useSettlementDetailQueryOption = (meetingId: number) =>
  queryOptions({
    queryKey: SettlementQueryKey.detail(meetingId),
    queryFn: () => getSettlementDetail(meetingId),
  });

export const useSettlementAttendeesQueryOption = (meetingId: number, roundId: number) =>
  queryOptions({
    queryKey: SettlementQueryKey.attendees(meetingId, roundId),
    queryFn: () => getSettlementAttendees(meetingId, roundId),
    staleTime: 0,
  });

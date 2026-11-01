import { queryOptions } from '@tanstack/react-query';

import { getSettlementDetail } from '.';
import SettlementQueryKey from './SettlementQueryKey';

export const useSettlementDetailQueryOption = (meetingId: number) =>
  queryOptions({
    queryKey: SettlementQueryKey.detail(meetingId),
    queryFn: () => getSettlementDetail(meetingId),
  });

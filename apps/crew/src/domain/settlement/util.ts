import type { GetSettlementDetail } from '@api/settlement/type';

import { SETTLEMENT_SEARCH_MAX_LENGTH } from './constant';

export const getSettlementRole = ({
  isLeader,
  isApprovedPayer,
  rounds,
}: Pick<GetSettlementDetail['response'], 'isLeader' | 'isApprovedPayer' | 'rounds'>) => {
  if (isLeader) return 'owner';
  if (isApprovedPayer) return 'co_payer';
  if (rounds.some((round) => round.myAttendanceStatus !== 'NOT_ATTENDING')) return 'attendee';
  return 'none';
};

export const normalizeSettlementSearch = (search: string) => {
  const truncated = search.trim().slice(0, SETTLEMENT_SEARCH_MAX_LENGTH);
  const lastCodeUnit = truncated.charCodeAt(truncated.length - 1);
  const endsWithHighSurrogate = lastCodeUnit >= 0xd800 && lastCodeUnit <= 0xdbff;

  return endsWithHighSurrogate ? truncated.slice(0, -1) : truncated;
};

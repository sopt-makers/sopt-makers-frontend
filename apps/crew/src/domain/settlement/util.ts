import { SETTLEMENT_SEARCH_MAX_LENGTH } from './constant';

export const normalizeSettlementSearch = (search: string) => {
  const truncated = search.trim().slice(0, SETTLEMENT_SEARCH_MAX_LENGTH);
  const lastCodeUnit = truncated.charCodeAt(truncated.length - 1);
  const endsWithHighSurrogate = lastCodeUnit >= 0xd800 && lastCodeUnit <= 0xdbff;

  return endsWithHighSurrogate ? truncated.slice(0, -1) : truncated;
};

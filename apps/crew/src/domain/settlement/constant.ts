import type { SettlementListPart, SettlementListStatus } from '@api/settlement/type';
import { PART_NAME, PART_VALUES } from '@constant/option';

export const SETTLEMENTS_PER_PAGE = 12;
export const SETTLEMENT_SEARCH_MAX_LENGTH = 30;

export const SETTLEMENT_STATUS_LABELS = {
  ongoing: '진행 중',
  ended: '종료',
} as const;

export const SETTLEMENT_STATUS_OPTIONS: { value: SettlementListStatus; label: string }[] = [
  { value: 'IN_PROGRESS', label: SETTLEMENT_STATUS_LABELS.ongoing },
  { value: 'ENDED', label: SETTLEMENT_STATUS_LABELS.ended },
];

export const SETTLEMENT_PART_OPTIONS: { value: SettlementListPart; label: string }[] = PART_VALUES.map((value) => ({
  value,
  label: PART_NAME[value] ?? value,
}));

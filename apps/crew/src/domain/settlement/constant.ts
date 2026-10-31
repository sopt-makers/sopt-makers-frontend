import { PART_NAME } from '@constant/option';

export const SETTLEMENT_STATUS_LABELS = {
  ongoing: '진행 중',
  ended: '종료',
} as const;

export const SETTLEMENT_STATUS_OPTIONS = Object.entries(SETTLEMENT_STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const SETTLEMENT_PART_OPTIONS = Object.entries(PART_NAME).map(([value, label]) => ({ value, label }));

import type { MeetingData } from '@api/meeting/type';
import { PART_NAME } from '@constant/option';

import type { paths } from '@/__generated__/schema';

export const SETTLEMENT_STATUS_LABELS = {
  ongoing: '진행 중',
  ended: '종료',
} as const;

export const SETTLEMENT_STATUS_OPTIONS = Object.entries(SETTLEMENT_STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const SETTLEMENT_PART_OPTIONS = Object.entries(PART_NAME).map(([value, label]) => ({ value, label }));

export type SettlementDisplayStatus = keyof typeof SETTLEMENT_STATUS_LABELS;
export type SettlementPart = MeetingData['joinableParts'][number];

export type SettlementDetail =
  paths['/dining/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export interface SettlementCardItem {
  id: string;
  title: string;
  dateLabel: string;
  thumbnailSrc: string;
  parts: SettlementPart[];
  status: SettlementDisplayStatus;
  participantCount: number;
  participantLabel: string;
  avatarSrc?: string;
}

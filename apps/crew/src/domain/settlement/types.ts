import type { MeetingData } from '@api/meeting/type';
import { PART_NAME } from '@constant/option';

export const SETTLEMENT_STATUS_OPTIONS = [
  { value: 'ongoing', label: '진행 중' },
  { value: 'ended', label: '종료' },
] as const;

export const SETTLEMENT_PART_OPTIONS = Object.entries(PART_NAME).map(([value, label]) => ({ value, label }));

export type SettlementDisplayStatus = (typeof SETTLEMENT_STATUS_OPTIONS)[number]['value'];
export type SettlementPart = MeetingData['joinableParts'][number];

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

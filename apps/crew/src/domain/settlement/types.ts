export const SETTLEMENT_STATUS_OPTIONS = [
  { value: 'ongoing', label: '진행 중' },
  { value: 'ended', label: '종료' },
] as const;

export const SETTLEMENT_PART_OPTIONS = [
  { value: 'PLAN', label: '기획' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'ANDROID', label: '안드로이드' },
  { value: 'IOS', label: 'iOS' },
  { value: 'WEB', label: '웹' },
  { value: 'SERVER', label: '서버' },
] as const;

export type SettlementDisplayStatus = (typeof SETTLEMENT_STATUS_OPTIONS)[number]['value'];
export type SettlementPart = (typeof SETTLEMENT_PART_OPTIONS)[number]['value'];

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

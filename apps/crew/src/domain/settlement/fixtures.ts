import type { SettlementCardItem } from './types';

// 아직 서버 API 구현 전이라 스키마는 임의로 구성했습니다!
// TODO: API 연동 후 삭제
export const settlementFixtures: SettlementCardItem[] = Array.from({ length: 12 }, (_, index) => ({
  id: `settlement-${index + 1}`,
  title: '회식명',
  dateLabel: '[26.05.12]',
  thumbnailSrc: '',
  parts: ['PM', 'DESIGN'],
  status: index % 3 === 1 ? 'ongoing' : 'ended',
  participantCount: 99,
  participantLabel: '홍길동 외 nn명이 참여 중',
}));

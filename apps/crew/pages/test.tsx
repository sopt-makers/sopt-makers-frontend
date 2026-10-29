//테스트용 페이지에용 머지전에 삭제할 예정!!

import SettlementList from '@domain/settlement/detail/SettlementList';
import { settlementListMocks } from '@domain/settlement/detail/SettlementList/mock';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

const cases = [
  { label: '신청자 · 신청 전', mock: settlementListMocks.beforeJoining },
  { label: '신청자 · 신청 후', mock: settlementListMocks.afterJoining },
  { label: '신청자 · 새 회차', mock: settlementListMocks.newRound },
  { label: '신청자 · 수정된 회차', mock: settlementListMocks.modifiedRound },
  { label: '중도 참여자 · 신청 전', mock: settlementListMocks.lateJoinerBeforeJoining },
  { label: '중도 참여자 · 신청 후', mock: settlementListMocks.lateJoinerAfterJoining },
  { label: '개설자 · 마감 전', mock: settlementListMocks.leaderBeforeClosing },
  { label: '개설자 · 마감 후', mock: settlementListMocks.leaderAfterClosing },
];

const TestPage = () => (
  <main>
    {cases.map(({ label, mock }) => (
      <SCase key={label}>
        <SHeading>{label}</SHeading>
        <SettlementList {...mock} />
      </SCase>
    ))}
  </main>
);

export default TestPage;

const SCase = styled('section', {
  padding: `${spacing.s40} 0 ${spacing.s80}`,
  borderBottom: `1px solid ${colors.stroke.neutral.ghost}`,
});

const SHeading = styled('h1', {
  ...typography.title3,
  color: colors.fg.neutral.subtle,
});

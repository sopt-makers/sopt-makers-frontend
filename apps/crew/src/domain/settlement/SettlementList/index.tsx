import type { SettlementListTab } from '@api/settlement/type';
import { SCardGrid } from '@shared/util/layout/CardGrid';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

import { mySettlementFixtures, settlementFixtures } from '../fixtures';
import SettlementCard from '../SettlementCard';

interface SettlementListProps {
  tab: SettlementListTab;
}

const SettlementList = ({ tab }: SettlementListProps) => {
  const isMine = tab === 'MY';
  const items = isMine ? mySettlementFixtures : settlementFixtures;

  return (
    <SResults>
      <SCount role='status' aria-live='polite'>
        {items.length}개의 회식
      </SCount>
      <SGrid isMine={isMine}>
        {items.map((item) => (
          <SettlementCard key={item.meetingId} item={item} showManagementButton={isMine && item.canManageAttendees} />
        ))}
      </SGrid>
    </SResults>
  );
};

export default SettlementList;

const SResults = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s24,
  '@tablet': { maxWidth: 380, width: '100%', marginInline: 'auto' },
  '@mobile': { maxWidth: 'none', gap: spacing.s4 },
});

const SCount = styled('p', {
  ...typography.title4,
  'color': colors.fg.neutral.bold,
  '@mobile': { ...typography.title5 },
});

const SGrid = styled(SCardGrid, {
  'rowGap': 60,
  '@mobile': { rowGap: 0 },
  'variants': {
    isMine: {
      true: {
        '@mobile': { rowGap: spacing.s4 },
      },
    },
  },
});

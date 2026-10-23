import { SCardGrid } from '@shared/util/layout/CardGrid';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

import { settlementFixtures } from '../fixtures';
import SettlementCard from '../SettlementCard';

const SettlementList = () => {
  return (
    <SResults>
      <SCount role='status' aria-live='polite'>
        {settlementFixtures.length}개의 회식
      </SCount>
      <SGrid>
        {settlementFixtures.map((item) => (
          <SettlementCard key={item.id} item={item} />
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
});

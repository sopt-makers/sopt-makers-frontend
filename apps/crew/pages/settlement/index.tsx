import SettlementList from '@domain/settlement/SettlementList';
import SettlementToolbar from '@domain/settlement/SettlementToolbar';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import type { NextPage } from 'next';
import { styled } from 'stitches.config';

const SettlementPage: NextPage = () => {
  return (
    <>
      <SLayout aria-label='전체 회식'>
        <CrewTab />

        <SViewSelector role='group' aria-label='회식 목록 범위'>
          <SViewButton type='button' size='large' variant='secondary' aria-pressed>
            전체 회식
          </SViewButton>
          <SViewButton type='button' size='large' variant='secondary' disabled aria-pressed={false}>
            내 회식
          </SViewButton>
        </SViewSelector>

        <SContent>
          <SettlementToolbar />
          <SettlementList />
        </SContent>
      </SLayout>
      <FloatingButton />
    </>
  );
};

export default SettlementPage;

const SLayout = styled('section', {
  'display': 'flex',
  'flexDirection': 'column',
  'paddingBottom': spacing.s120,
  '@desktop': { maxWidth: 790, marginInline: 'auto' },
  '@tablet': { maxWidth: 783 },
  '@mobile': { paddingTop: spacing.s10, paddingBottom: spacing.s12 },
});

const SViewSelector = styled('div', {
  'display': 'flex',
  'justifyContent': 'center',
  'gap': spacing.s8,
  'marginTop': 125,
  'marginBottom': spacing.s80,
  '@mobile': { marginTop: 34, marginBottom: spacing.s32 },
});

const SContent = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s40,
  '@mobile': { gap: spacing.s20 },
});

const SViewButton = styled(ActionButton, {
  '&&': {
    paddingInline: spacing.s20,
    backgroundColor: colors.bg.layer.basement,
    color: colors.fg.neutral.subtle,
  },
  '&&[aria-pressed=true]': {
    backgroundColor: colors.bg.neutral.subtle,
    color: colors.fg.neutral.bold,
  },
  '&&:disabled': {
    backgroundColor: colors.bg.layer.basement,
    color: colors.fg.neutral.subtle,
  },
  '@mobile': {
    '&&': { ...typography.label3, height: 38, padding: `${spacing.s10} ${spacing.s12}`, borderRadius: radius.r8 },
  },
});

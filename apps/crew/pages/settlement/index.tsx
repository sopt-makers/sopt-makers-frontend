import SettlementList from '@domain/settlement/SettlementList';
import SettlementToolbar from '@domain/settlement/SettlementToolbar';
import { Tab } from '@headlessui/react';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import { colors, spacing } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import type { NextPage } from 'next';
import { styled } from 'stitches.config';

const SettlementPage: NextPage = () => {
  const { isMobile } = useDisplay();

  return (
    <>
      <SLayout aria-label='회식'>
        <CrewTab />

        <Tab.Group>
          {({ selectedIndex }) => (
            <>
              <SViewSelector aria-label='회식 목록 범위'>
                <Tab as={SViewButton} type='button' size={isMobile ? 'small' : 'large'} variant='secondary'>
                  전체 회식
                </Tab>
                <Tab as={SViewButton} type='button' size={isMobile ? 'small' : 'large'} variant='secondary'>
                  내 회식
                </Tab>
              </SViewSelector>

              <SContent>
                <SettlementToolbar showFilters={selectedIndex === 0} />

                <Tab.Panels>
                  <Tab.Panel>
                    <SettlementList tab='ALL' />
                  </Tab.Panel>
                  <Tab.Panel>
                    <SettlementList tab='MY' />
                  </Tab.Panel>
                </Tab.Panels>
              </SContent>
            </>
          )}
        </Tab.Group>
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

const SViewSelector = styled(Tab.List, {
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
    backgroundColor: colors.bg.layer.basement,
    color: colors.fg.neutral.subtle,
  },
  '&&[aria-selected=true]': {
    backgroundColor: colors.bg.neutral.subtle,
    color: colors.fg.neutral.bold,
  },
});

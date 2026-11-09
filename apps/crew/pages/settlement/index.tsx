import { useUserProfileQueryOption } from '@api/user/query';
import SettlementList from '@domain/settlement/SettlementList';
import SettlementToolbar from '@domain/settlement/SettlementToolbar';
import { Tab } from '@headlessui/react';
import { useQueryString } from '@hook/queryString';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import { colors, spacing } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const TABS = [
  { value: 'ALL', label: '전체 회식' },
  { value: 'MY', label: '내 회식' },
] as const;

const SettlementPage: NextPage = () => {
  const { isMobile } = useDisplay();
  const router = useRouter();
  const { data: user } = useQuery(useUserProfileQueryOption());
  const { value: tabValue, setValue: setTab } = useQueryString('tab', 'ALL', true);
  const tab = tabValue === 'MY' ? 'MY' : 'ALL';

  useEffect(
    function trackSettlementListView() {
      if (!router.isReady || user?.orgId === undefined) return;

      ampli.viewSettlementList({ user_id: user?.orgId });
    },
    [router.isReady, user?.orgId],
  );

  const handleTabChange = (index: number) => {
    const selectedTab = index === 0 ? TABS[0] : TABS[1];

    if (selectedTab.value !== tab) {
      ampli.clickSettlementListTab({
        settlement_list_tab: selectedTab.value === 'ALL' ? 'all' : 'mine',
        user_id: user?.orgId,
      });
    }
    setTab(selectedTab.value);
  };

  return (
    <>
      <SCrewTab />
      <SSettlementLayout aria-label='회식'>
        <Tab.Group selectedIndex={TABS.findIndex(({ value }) => value === tab)} onChange={handleTabChange}>
          <SViewSelector aria-label='회식 목록 범위'>
            {TABS.map(({ value, label }) => (
              <Tab key={value} as={SViewButton} type='button' size={isMobile ? 'small' : 'large'} variant='secondary'>
                {label}
              </Tab>
            ))}
          </SViewSelector>

          <SContent>
            <SettlementToolbar showFilters={tab === 'ALL'} />

            <Tab.Panels>
              {TABS.map(({ value }) => (
                <Tab.Panel key={value}>
                  <SettlementList tab={value} enabled={router.isReady && tab === value} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </SContent>
        </Tab.Group>
      </SSettlementLayout>
      <FloatingButton />
    </>
  );
};

export default SettlementPage;

const SCrewTab = styled(CrewTab, {
  'width': '100%',
  '@tablet': { width: '734px', mx: '$auto' },
  '@mobile': { width: '100%' },
});

const SSettlementLayout = styled('section', {
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

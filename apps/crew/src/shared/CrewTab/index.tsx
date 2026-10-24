import { TabList } from '@common/tabList/TabList';
import { Flex } from '@shared/util/layout/Flex';
import { spacing } from '@sopt-mds/design-tokens';
import { Tag } from '@sopt-mds/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

interface CrewTabProps {
  children?: ReactNode;
  className?: string;
}

const CrewTab = ({ children, className }: CrewTabProps) => {
  const path = useRouter().pathname;
  const tabText = {
    group: 'feedAll',
    list: 'groupAll',
    mine: 'mine',
    management: 'mine',
    settlement: 'settlement',
    map: 'map',
  };

  const lastSegment = (path.split('/').at(-1) || 'group') as keyof typeof tabText;

  return (
    <SContainer align='center' justify='between' className={className}>
      <SScrollableTabList text={tabText[lastSegment]} size='big'>
        <SLink href='/' onClick={() => ampli.clickNavbarGroup({ menu: '피드' })}>
          <TabList.Item text='feedAll'>홈</TabList.Item>
        </SLink>
        <SLink href='/list' onClick={() => ampli.clickNavbarGroup({ menu: '전체 모임' })}>
          <TabList.Item text='groupAll'>전체 모임</TabList.Item>
        </SLink>
        <SLink href='/mine' onClick={() => ampli.clickNavbarGroup({ menu: '내 모임' })}>
          <TabList.Item text='mine'>내 모임</TabList.Item>
        </SLink>
        <SLink href='/settlement'>
          <TabList.Item text='settlement'>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s4 }}>
              회식
              <Tag size='small' shape='pill' variant='primary' type='subtle'>
                New
              </Tag>
            </div>
          </TabList.Item>
        </SLink>
        <SLink href='/map' onClick={() => ampli.clickNavbarGroup({ menu: '솝맵' })}>
          <TabList.Item text='map'>솝맵</TabList.Item>
        </SLink>
      </SScrollableTabList>
      {children && <SActions>{children}</SActions>}
    </SContainer>
  );
};

export default CrewTab;

const SContainer = styled(Flex, {
  minWidth: 0,
  gap: spacing.s16,
});

const SScrollableTabList = styled(TabList, {
  'minWidth': 0,
  'overflowX': 'auto',
  'scrollPaddingInline': spacing.s16,
  'scrollbarWidth': 'none',
  '&::-webkit-scrollbar': { display: 'none' },
});

const SActions = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'flex-end',
  'flexShrink': 0,
  '@mobile': { minWidth: 24 },
});

const SLink = styled(Link, {
  flexShrink: 0,
});

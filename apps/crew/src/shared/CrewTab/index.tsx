import { TabList } from '@common/tabList/TabList';
import { Flex } from '@shared/util/layout/Flex';
import { spacing } from '@sopt-mds/design-tokens';
import { Tag } from '@sopt-mds/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

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
    map: 'map',
  };

  const lastSegment = (path.split('/').at(-1) || 'group') as keyof typeof tabText;

  return (
    <Flex align='center' justify='between' className={className}>
      <TabList text={tabText[lastSegment]} size='big'>
        <Link href='/' onClick={() => ampli.clickNavbarGroup({ menu: '피드' })}>
          <TabList.Item text='feedAll'>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.s4 }}>
              홈
              <Tag size='small' shape='rect' variant='primary' type='subtle'>
                NEW
              </Tag>
            </div>
          </TabList.Item>
        </Link>
        <Link href='/list' onClick={() => ampli.clickNavbarGroup({ menu: '전체 모임' })}>
          <TabList.Item text='groupAll'>전체 모임</TabList.Item>
        </Link>
        <Link href='/mine' onClick={() => ampli.clickNavbarGroup({ menu: '내 모임' })}>
          <TabList.Item text='mine'>내 모임</TabList.Item>
        </Link>
        <Link href='/map' onClick={() => ampli.clickNavbarGroup({ menu: '솝맵' })}>
          <TabList.Item text='map'>솝맵</TabList.Item>
        </Link>
      </TabList>
      {children}
    </Flex>
  );
};

export default CrewTab;

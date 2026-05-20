import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';
import type { ReactNode } from 'react';

import CoffeeChatIcon from '@/public/icons/menuEntry/icon-coffeechat.svg';
import CrewIcon from '@/public/icons/menuEntry/icon-crew.svg';
import FeedIcon from '@/public/icons/menuEntry/icon-feed.svg';
import MemberIcon from '@/public/icons/menuEntry/icon-member.svg';
import ProjectIcon from '@/public/icons/menuEntry/icon-project.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MenuEntry {
  icon: ReactNode;
  label: string;
  href: string;
}

const MENU_ENTRY_LIST: MenuEntry[] = [
  { icon: <MemberIcon />, label: '멤버', href: playgroundLink.memberList() },
  { icon: <FeedIcon />, label: '커뮤니티', href: playgroundLink.feedList() },
  { icon: <CrewIcon />, label: '모임', href: playgroundLink.groupList() },
  {
    icon: <ProjectIcon />,
    label: '프로젝트',
    href: playgroundLink.projectList(),
  },
  {
    icon: <CoffeeChatIcon />,
    label: '커피솝',
    href: playgroundLink.coffeechat(),
  },
];

interface MenuEntryIconsProps {
  className?: string;
}

const MenuEntryIcons = ({ className }: MenuEntryIconsProps) => {
  return (
    <StyledContainer className={className}>
      {MENU_ENTRY_LIST.map((menu) => (
        <MenuIcon key={menu.label} icon={menu.icon} label={menu.label} href={menu.href} />
      ))}
    </StyledContainer>
  );
};

const StyledContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 16px 28px;
  border-bottom: 1px solid ${colors.gray800};
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
  }
`;

export default MenuEntryIcons;

interface MenuIconProps {
  icon: ReactNode;
  label: string;
  href: string;
}

const MenuIcon = ({ label, icon, href }: MenuIconProps) => {
  return (
    <MenuIconWrapper href={href}>
      <MenuIconBox>{icon}</MenuIconBox>
      <MenuLabel>{label}</MenuLabel>
    </MenuIconWrapper>
  );
};

const MenuIconWrapper = styled(Link)`
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${colors.gray800};
    }
  }
`;

const MenuIconBox = styled.div`
  border-radius: 12px;
  background-color: ${colors.gray900};
  padding: 8px;
  height: 46px;
`;

const MenuLabel = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    white-space: nowrap;
    ${fonts.TITLE_14_SB}
  }
`;

import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';
import type { ReactNode } from 'react';

import CoffeeChatIcon from '@/public/icons/menuEntry/icon-coffeechat.svg';
import FeedIcon from '@/public/icons/menuEntry/icon-feed.svg';
import MemberIcon from '@/public/icons/menuEntry/icon-member.svg';
import ProjectIcon from '@/public/icons/menuEntry/icon-project.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import type { MenuKey } from './MenuPreview';

interface MenuMeta {
  href: string;
  leftAddon: ReactNode;
  label: '멤버' | '커뮤니티' | '프로젝트' | '커피솝';
}

const MENU_CONFIG: Record<MenuKey, MenuMeta> = {
  members: {
    href: playgroundLink.memberList(),
    leftAddon: <MemberIcon width={18} height={18} />,
    label: '멤버',
  },
  feed: {
    href: playgroundLink.feedList(),
    leftAddon: <FeedIcon width={18} height={18} />,
    label: '커뮤니티',
  },
  projects: {
    href: playgroundLink.projectList(),
    leftAddon: <ProjectIcon width={18} height={18} />,
    label: '프로젝트',
  },
  coffeechat: {
    href: playgroundLink.coffeechat(),
    leftAddon: <CoffeeChatIcon width={18} height={18} />,
    label: '커피솝',
  },
};

interface MenuLinkProps {
  menu: MenuKey;
}

const MenuLink = ({ menu }: MenuLinkProps) => {
  const { href, leftAddon, label } = MENU_CONFIG[menu];

  return (
    <StyledLink href={href}>
      {leftAddon}
      <StyledLabel>{label} &gt;</StyledLabel>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const StyledLabel = styled.span`
  color: ${colors.gray100};
  ${fonts.BODY_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M}
  }
`;

export default MenuLink;

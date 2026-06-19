import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';

import { textStyles } from '../../../styles/typography';
import { SOPT_MAKRES_LOGO_SVG } from '../imageData';
import type { LinkRenderer, PathMatcher } from '../types';
import ProfileButton from './ProfileButton';
import ProfileDropdown from './ProfileDropdown';

interface DesktopHeaderProps {
  user: {
    id: string;
    name: string;
    image?: string;
  } | null;

  onLogout?: () => void;
  renderLink: LinkRenderer;
  activePathMatcher: PathMatcher;
}

const DesktopHeader = ({ user, onLogout, renderLink, activePathMatcher }: DesktopHeaderProps) => {
  return (
    <Container>
      <StyledBrandLink>
        {renderLink({
          href: playgroundLink.home(),
          children: <SOPT_MAKRES_LOGO_SVG />,
        })}
      </StyledBrandLink>
      <NavArea>
        <NavSlot>
          {renderLink({
            href: playgroundLink.memberList(),
            children: <NavItem isActive={activePathMatcher(playgroundLink.memberList())}>멤버</NavItem>,
          })}
        </NavSlot>
        <NavSlot>
          {renderLink({
            href: playgroundLink.feedList(),
            children: <NavItem isActive={activePathMatcher(playgroundLink.feedList())}>커뮤니티</NavItem>,
          })}
        </NavSlot>
        <NavSlot>
          {renderLink({
            href: playgroundLink.groupList(),
            children: <NavItem isActive={activePathMatcher(playgroundLink.groupList())}>모임</NavItem>,
          })}
        </NavSlot>
        <NavSlot>
          {renderLink({
            href: playgroundLink.projectList(),
            children: <NavItem isActive={activePathMatcher(playgroundLink.projectList())}>프로젝트</NavItem>,
          })}
        </NavSlot>
        <NavSlot>
          {renderLink({
            href: playgroundLink.coffeechat(),
            children: <NavItem isActive={activePathMatcher(playgroundLink.coffeechat())}>커피솝</NavItem>,
          })}
        </NavSlot>
        <NavSlot>
          <NavItem isActive={false}>|</NavItem>
        </NavSlot>
        <NavSlot shrinkable>
          {renderLink({
            href: playgroundLink.blog(),
            children: <NavItem isActive={activePathMatcher(playgroundLink.blog())}>활동후기 업로드</NavItem>,
          })}
        </NavSlot>
      </NavArea>
      <ActionArea>
        <ProfileButtonHolder>
          <ProfileDropdown
            myProfileHref={user ? playgroundLink.memberDetail(user.id) : ''}
            onLogout={onLogout}
            renderLink={renderLink}
          >
            {user ? <ProfileButton name={user.name} profileImage={user.image} /> : <ProfileButton name='' />}
          </ProfileDropdown>
        </ProfileButtonHolder>
      </ActionArea>
    </Container>
  );
};

export default DesktopHeader;

const Container = styled.header`
  display: flex;
  gap: 16px;
  border-bottom: 1px solid ${colors.gray800};
  background-color: ${colors.gray950};
  height: 80px;
  padding: 18px 36px;
  color: ${colors.gray10};
`;

const StyledBrandLink = styled.div`
  margin-right: 24px;

  & > * {
    display: flex;
    align-items: center;
    height: 100%;
  }

  & > a > svg {
    width: 120px;
  }
`;

const NavArea = styled.nav`
  display: flex;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

const NavSlot = styled.div<{ shrinkable?: boolean }>`
  display: flex;
  flex-shrink: ${(props) => (props.shrinkable ? 1 : 0)};
  min-width: 0;

  & > * {
    display: flex;
    align-items: center;
    min-width: 0;
  }
`;

const NavItem = styled.div<{ isActive: boolean }>`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => (props.isActive ? colors.gray10 : colors.gray100)};

  ${(props) =>
    props.isActive
      ? css`
          ${textStyles.SUIT_18_B}
        `
      : css`
          ${textStyles.SUIT_18_M}
        `}
`;

const ActionArea = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileButtonHolder = styled.div`
  display: flex;
  align-items: center;
`;

import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import MenuLink from './MenuLink';

export type MenuKey = 'member' | 'community' | 'project' | 'coffeechat';

interface MenuPreviewProps {
  menu: MenuKey;
  children: ReactNode;
  className?: string;
}

const MenuPreview = ({ menu, children, className }: MenuPreviewProps) => {
  return (
    <StyledContainer className={className}>
      <MenuLink menu={menu} />
      {children}
    </StyledContainer>
  );
};

export default MenuPreview;

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import MenuLink from './MenuLink';

export type MenuKey = 'member' | 'community' | 'project' | 'coffeechat';

interface MenuPreviewProps {
  menu: MenuKey;
  content: ReactNode;
  className?: string;
}

const MenuPreview = ({ menu, content, className }: MenuPreviewProps) => {
  return (
    <StyledContainer className={className}>
      <MenuLink menu={menu} />
      {content}
    </StyledContainer>
  );
};

export default MenuPreview;

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

import styled from '@emotion/styled';
import { colors } from '@sopt-mds/design-tokens';
import type { ReactNode } from 'react';

import Header from '@/components/common/Header';
import Responsive from '@/components/common/Responsive';
import SopmodamHeader from '@/components/sopmodam/common/SopmodamHeader';
import { useSopmodamBack } from '@/components/sopmodam/common/useSopmodamBack';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamLayoutProps {
  children: ReactNode;
  headerType?: 'back' | 'playground';
}

const SopmodamLayout = ({ children, headerType = 'back' }: SopmodamLayoutProps) => {
  const handleBack = useSopmodamBack();

  return (
    <Container>
      <Responsive only='mobile'>
        {headerType === 'playground' ? <Header /> : <SopmodamHeader onBack={handleBack} />}
      </Responsive>
      {children}
    </Container>
  );
};

export default SopmodamLayout;

const Container = styled.div`
  background-color: ${colors.bg.layer.basement};
  min-height: calc(100vh - 80px);

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: 100vh;
  }
`;

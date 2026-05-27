import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import type { ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface TitledContentProps {
  title: string;
  children: ReactNode;
}

const TitledContent = ({ title, children }: TitledContentProps) => {
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledContainer>
  );
};

export default TitledContent;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
  }
`;

const StyledTitle = styled.div`
  color: ${colors.white};
  ${fonts.HEADING_20_B}

  @media ${MOBILE_MEDIA_QUERY} {
    color: ${colors.gray10};
    ${fonts.HEADING_18_B}
  }
`;

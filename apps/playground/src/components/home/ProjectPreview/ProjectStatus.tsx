import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import type { ReactNode } from 'react';

import IconCircleSuccess from '@/public/icons/icon-circle-success.svg';

interface ProjectStatusProps {
  children: ReactNode;
}

const ProjectStatus = ({ children }: ProjectStatusProps) => {
  return (
    <StyledContainer>
      <IconCircleSuccess />
      <StyledText>{children}</StyledText>
    </StyledContainer>
  );
};

export default ProjectStatus;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledText = styled.span`
  color: ${colors.gray100};
  ${fonts.LABEL_11_SB}
`;

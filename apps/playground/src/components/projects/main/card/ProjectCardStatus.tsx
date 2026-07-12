import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import type { PropsWithChildren } from 'react';

const ProjectCardStatus = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Container>
      <Circle />
      <StatusText>{children}</StatusText>
    </Container>
  );
};

export default ProjectCardStatus;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s4};
`;

const Circle = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${colors.fg.secondary.default};
`;

const StatusText = styled.span`
  color: ${colors.fg.neutral.subtle};
  ${typography.label4}
`;

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Skeleton from '@/components/common/Skeleton';

const ProjectCardSkeleton = () => {
  return (
    <StyledContainer>
      <Skeleton height={180} borderRadius='8px 8px 0 0' />
      <StyledBody>
        <Skeleton width={56} height={56} borderRadius='6px' />
        <StyledInfo>
          <StyledTitleGroup>
            <Skeleton width={150} height={16} borderRadius='5px' />
            <Skeleton width={130} height={24} borderRadius='5px' />
          </StyledTitleGroup>
          <StyledStatusGroup>
            <Skeleton width={120} height={20} borderRadius='5px' />
            <Skeleton width={80} height={14} borderRadius='5px' />
          </StyledStatusGroup>
        </StyledInfo>
      </StyledBody>
    </StyledContainer>
  );
};

export default ProjectCardSkeleton;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 302px;
  border-radius: 12px;
  background-color: ${colors.gray900};
`;

const StyledBody = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 16px;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const StyledTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledStatusGroup = styled(StyledTitleGroup)``;

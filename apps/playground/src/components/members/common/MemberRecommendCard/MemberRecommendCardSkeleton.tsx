import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Skeleton from '@/components/common/Skeleton';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import type { Usage } from './MemberRecommendCard';

interface MemberRecommendCardSkeletonProps {
  usage: Usage;
}

const MemberRecommendCardSkeleton = ({ usage }: MemberRecommendCardSkeletonProps) => {
  return (
    <StyledContainer usage={usage}>
      <StyledAvatar usage={usage} borderRadius='50%' />
      <StyledInfoWrapper usage={usage}>
        <Skeleton width={80} height={20} borderRadius='6px' />
        <Skeleton width={60} height={14} borderRadius='6px' />
      </StyledInfoWrapper>
    </StyledContainer>
  );
};

export default MemberRecommendCardSkeleton;

const StyledContainer = styled.div<{ usage: string }>`
  display: flex;
  flex-direction: ${({ usage }) => (usage === 'home' ? 'column' : 'row')};
  gap: 16px;
  align-items: center;
  padding: 16px 24px;
  background-color: ${colors.gray900};
  border-radius: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: ${({ usage }) => (usage === 'home' ? 'row' : 'column')};
    gap: 8px;
    padding: 12px 16px;
  }
`;

const StyledAvatar = styled(Skeleton)<{ usage: string }>`
  flex-shrink: 0;
  width: 80px;
  height: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: ${({ usage }) => (usage === 'home' ? '56px' : '72px')};
    height: ${({ usage }) => (usage === 'home' ? '56px' : '72px')};
  }
`;

const StyledInfoWrapper = styled.div<{ usage: string }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: ${({ usage }) => (usage === 'home' ? 'center' : 'start')};
  gap: 6px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 4px;
    align-items: ${({ usage }) => (usage === 'home' ? 'start' : 'center')};
  }
`;

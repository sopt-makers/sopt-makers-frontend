import styled from '@emotion/styled';
import { colors, spacing } from '@sopt-mds/design-tokens';

import Skeleton from '@/components/common/Skeleton';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const SopmodamAnswerCardSkeleton = () => {
  return (
    <SContainer>
      <SAuthor>
        <Skeleton width={32} height={32} borderRadius='50%' />
        <Skeleton width={120} height={22} borderRadius='4px' />
      </SAuthor>
      <SContent>
        <Skeleton height={52} borderRadius='4px' />
        <Skeleton width={200} height={36} borderRadius='4px' />
      </SContent>
    </SContainer>
  );
};

export default SopmodamAnswerCardSkeleton;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
  padding: ${spacing.s24} ${spacing.s0};
  border-bottom: 1px solid ${colors.stroke.neutral.ghost};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: ${spacing.s16} ${spacing.s0};
  }
`;

const SAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s12};
`;

const SContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing.s16};

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: center;
  }
`;

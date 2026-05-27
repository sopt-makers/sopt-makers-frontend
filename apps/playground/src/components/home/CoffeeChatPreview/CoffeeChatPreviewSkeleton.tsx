import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Divider from '@/components/common/Divider/Divider';
import Skeleton from '@/components/common/Skeleton';
import { DESKTOP_TWO_MEDIA_QUERY, MB_BIG_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CoffeeChatPreviewSkeletonProps {
  count: number;
}

const CoffeeChatPreviewSkeleton = ({ count }: CoffeeChatPreviewSkeletonProps) => {
  return (
    <StyledContainer>
      <Skeleton width={250} height={30} borderRadius='8px' />
      <CoffeeChatSkeletonList aria-hidden>
        {Array.from({ length: count }, (_, index) => (
          <StyledCardContainer key={index}>
            <StyledTitleSection>
              <StyledTitle>
                <Skeleton height={24} borderRadius='6px' color={colors.gray700} />
                <StyledTitleShortLine>
                  <Skeleton height={24} borderRadius='6px' color={colors.gray700} />
                </StyledTitleShortLine>
              </StyledTitle>
              <StyledTagSection>
                <Skeleton width={56} height={24} borderRadius='6px' color={colors.gray700} />
                <Skeleton width={72} height={24} borderRadius='6px' color={colors.gray700} />
              </StyledTagSection>
            </StyledTitleSection>
            <Divider color='#3F3F47' />
            <StyledProfileSection>
              <Skeleton width={70} height={70} borderRadius='50%' color={colors.gray700} />
              <StyledInfoSection>
                <Skeleton width={100} height={20} borderRadius='5px' color={colors.gray700} />
                <StyledSoptTagSection>
                  <Skeleton width={56} height={22} borderRadius='6px' color={colors.gray700} />
                  <Skeleton width={56} height={22} borderRadius='6px' color={colors.gray700} />
                </StyledSoptTagSection>
              </StyledInfoSection>
            </StyledProfileSection>
          </StyledCardContainer>
        ))}
      </CoffeeChatSkeletonList>
    </StyledContainer>
  );
};

export default CoffeeChatPreviewSkeleton;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
  }
`;

const CoffeeChatSkeletonList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* 1200~: 3장 */
  gap: 12px;
  width: 100%;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* ~1200: 2장 */

    & > *:nth-of-type(n + 3) {
      display: none;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: minmax(0, 1fr); /* ~768: 1장 */

    & > *:nth-of-type(n + 2) {
      display: none;
    }
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  justify-content: space-between;
  border-radius: 24px;
  background-color: ${colors.gray900};
  padding: 32px;
  width: 100%;
  height: 280px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 24px;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    gap: 4px;
    border-radius: 20px;
    height: 234px;
  }
`;

const StyledTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 96px;
  min-height: 96px;

  @media ${MB_BIG_MEDIA_QUERY} {
    gap: 4px;
    height: 80px;
    min-height: 80px;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitleShortLine = styled.div`
  width: 70%;
`;

const StyledTagSection = styled.div`
  display: flex;
  gap: 4px;
`;

const StyledProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
    width: 100%;
  }
`;

const StyledInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const StyledSoptTagSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 12px;
`;

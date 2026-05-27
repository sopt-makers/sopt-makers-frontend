import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { useGetMemberRecommendById } from '@/api/endpoint/members/getMemberRecommendById';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import RefreshIcon from '@/public/icons/icon_refresh.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import MemberRecommendCard from '../../common/MemberRecommendCard/MemberRecommendCard';
import MemberRecommendCardSkeleton from '../../common/MemberRecommendCard/MemberRecommendCardSkeleton';

const SKELETON_COUNT = 3;

interface MemberRecommendSectionProps {
  memberId: string;
  name: string;
}

const MemberRecommendSection = ({ memberId, name }: MemberRecommendSectionProps) => {
  const { data, isLoading, refetch } = useGetMemberRecommendById(memberId);
  const memberRecommendData = data?.members.slice(0, 3);

  const { logClickEvent } = useEventLogger();

  const handleRereshIconClick = () => {
    refetch();
    logClickEvent('memberRecommendRefresh', { screen: 'profile' });
  };

  return (
    <StyledSection>
      <StyledSectionHeader>
        <StyledSectionTitle>{name}님과 접점이 있는 멤버</StyledSectionTitle>
        <StyledRefreshIcon onClick={handleRereshIconClick} />
      </StyledSectionHeader>
      <StyledCardGrid>
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <MemberRecommendCardSkeleton key={index} usage='profile' />
            ))
          : memberRecommendData?.map((member) => (
              <MemberRecommendCard key={member.id} member={member} usage='profile' />
            ))}
      </StyledCardGrid>
    </StyledSection>
  );
};

export default MemberRecommendSection;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    margin-top: 40px;
  }
`;

const StyledSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledSectionTitle = styled.span`
  color: ${colors.gray10};
  ${fonts.HEADING_28_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_20_B}
  }
`;

const StyledRefreshIcon = styled(RefreshIcon)`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 24px;
    height: 24px;
  }
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
  }
`;

import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';

import { useGetMemberRecommendOfMe } from '@/api/endpoint/members/getMemberRecommendOfMe';
import RefreshIcon from '@/public/icons/icon_refresh.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import MemberRecommendCard from '../../common/MemberRecommendCard/MemberRecommendCard';
import { DESKTOP_TWO_MEDIA_QUERY } from '../contants';

const MemberRecommendSection = () => {
  const { data: memberRecommendData, refetch } = useGetMemberRecommendOfMe();

  return (
    <StyledSection>
      <StyledSectionHeader>
        <StyledSectionTitle>나와 접점이 있는 멤버</StyledSectionTitle>
        <StyledRefreshIcon onClick={refetch} />
      </StyledSectionHeader>
      <StyledCardGrid>
        {memberRecommendData?.members.map((member) => (
          <Link key={member.id} href={playgroundLink.memberDetail(member.id)}>
            <MemberRecommendCard
              key={member.id}
              name={member.name}
              profileImage={member.profileImage}
              generation={member.generation}
              part={member.part}
              recommendType={member.recommendType}
            />
          </Link>
        ))}
      </StyledCardGrid>
    </StyledSection>
  );
};

export default MemberRecommendSection;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 52px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    padding: 16px 0;
    margin-bottom: 0;
  }
`;

const StyledSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 4px;
  }
`;

const StyledSectionTitle = styled.span`
  color: ${colors.gray10};
  ${fonts.HEADING_24_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_16_B}
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
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(3, 1fr);

    // TODO: random 로직으로 변경
    & > *:nth-child(n + 4) {
      display: none;
    }
  }
`;

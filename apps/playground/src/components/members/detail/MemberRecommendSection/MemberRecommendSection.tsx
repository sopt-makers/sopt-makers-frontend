import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';

import { useGetMemberRecommendById } from '@/api/endpoint/members/getMemberRecommendById';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import RefreshIcon from '@/public/icons/icon_refresh.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import MemberRecommendCard from '../../common/MemberRecommendCard/MemberRecommendCard';

interface MemberRecommendSectionProps {
  memberId: string;
  name: string;
}

const MemberRecommendSection = ({ memberId, name }: MemberRecommendSectionProps) => {
  const { data, refetch } = useGetMemberRecommendById(memberId);
  const memberRecommendData = data?.members.slice(0, 3);

  return (
    <StyledSection>
      <StyledSectionHeader>
        <StyledSectionTitle>{name}님과 접점이 있는 멤버</StyledSectionTitle>
        <StyledRefreshIcon onClick={refetch} />
      </StyledSectionHeader>
      <StyledCardGrid>
        {memberRecommendData?.map((member) => (
          <LoggingClick
            key={member.id}
            eventKey='profileConnectionCard'
            param={{ id: member.id, name: member.name, recommendationType: member.recommendType }}
          >
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
          </LoggingClick>
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

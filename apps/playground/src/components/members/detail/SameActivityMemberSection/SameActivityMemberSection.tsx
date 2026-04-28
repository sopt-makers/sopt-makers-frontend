import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';

import { useGetMemberGenerationPart } from '@/api/endpoint/members/getMemberGenerationPart';
import type { SoptActivity } from '@/api/endpoint_LEGACY/members/type';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import SameActivityMemberCard from './SameActivityMemberCard';

interface SamePartMemberSectionProps {
  memberId: string;
  name: string;
  recentSoptActivity: SoptActivity;
}

const SamePartMemberSection = ({ memberId, name, recentSoptActivity }: SamePartMemberSectionProps) => {
  const isMakers = recentSoptActivity.team === '메이커스';
  const { data: memberGenerationPartData } = useGetMemberGenerationPart(memberId);

  return (
    <StyledSection>
      <StyledSectionTitle>
        {name}님과 같은 {recentSoptActivity.generation}기 {isMakers ? '메이커스' : `${recentSoptActivity.part}`}
      </StyledSectionTitle>
      <StyledCardGrid>
        {memberGenerationPartData?.members.map((member) => (
          <Link key={member.id} href={playgroundLink.memberDetail(member.id)}>
            <SameActivityMemberCard
              profileImage={member.profileImage}
              name={member.name}
              generation={member.generation}
              part={member.part}
            />
          </Link>
        ))}
      </StyledCardGrid>
    </StyledSection>
  );
};

export default SamePartMemberSection;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
    margin-bottom: 24px;
  }
`;

const StyledSectionTitle = styled.span`
  color: ${colors.gray10};
  ${fonts.HEADING_20_B}
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(2, 1fr);

    & > *:nth-child(n + 3) {
      display: none;
    }
  }
`;

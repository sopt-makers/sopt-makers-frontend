import styled from '@emotion/styled';

import { useGetMemberRecommendOfMe } from '@/api/endpoint/members/getMemberRecommendOfMe';
import Responsive from '@/components/common/Responsive';
import MemberRecommendCard from '@/components/members/common/MemberRecommendCard/MemberRecommendCard';

const MemberList = () => {
  const { data: memberRecommendData } = useGetMemberRecommendOfMe();
  const desktopMemberData = memberRecommendData?.members;
  const mobileMemberData = memberRecommendData?.members.slice(0, 2);

  return (
    <>
      <Responsive only='desktop'>
        <StyledGrid>
          {desktopMemberData?.map((member) => (
            <MemberRecommendCard key={member.id} member={member} usage='home' />
          ))}
        </StyledGrid>
      </Responsive>
      <Responsive only='mobile'>
        <StyledGrid>
          {mobileMemberData?.map((member) => (
            <MemberRecommendCard key={member.id} member={member} usage='home' />
          ))}
        </StyledGrid>
      </Responsive>
    </>
  );
};

export default MemberList;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

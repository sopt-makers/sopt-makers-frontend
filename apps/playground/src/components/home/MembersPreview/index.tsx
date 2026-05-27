import styled from '@emotion/styled';

import { useGetMemberRecommendOfMe } from '@/api/endpoint/members/getMemberRecommendOfMe';
import Responsive from '@/components/common/Responsive';
import MemberRecommendCard from '@/components/members/common/MemberRecommendCard/MemberRecommendCard';
import MemberRecommendCardSkeleton from '@/components/members/common/MemberRecommendCard/MemberRecommendCardSkeleton';

import TitledContent from '../common/TitledContent';

const DESKTOP_SKELETON_COUNT = 4;
const MOBILE_SKELETON_COUNT = 2;

const MemberPreview = () => {
  const { data: memberRecommendData, isLoading } = useGetMemberRecommendOfMe();
  const desktopMemberData = memberRecommendData?.members;
  const mobileMemberData = memberRecommendData?.members.slice(0, 2);

  return (
    <TitledContent title={'나와 접점이 있는 멤버'}>
      <Responsive only='desktop'>
        <StyledGrid>
          {isLoading
            ? Array.from({ length: DESKTOP_SKELETON_COUNT }, (_, index) => (
                <MemberRecommendCardSkeleton key={index} usage='home' />
              ))
            : desktopMemberData?.map((member) => <MemberRecommendCard key={member.id} member={member} usage='home' />)}
        </StyledGrid>
      </Responsive>
      <Responsive only='mobile'>
        <StyledGrid>
          {isLoading
            ? Array.from({ length: MOBILE_SKELETON_COUNT }, (_, index) => (
                <MemberRecommendCardSkeleton key={index} usage='home' />
              ))
            : mobileMemberData?.map((member) => <MemberRecommendCard key={member.id} member={member} usage='home' />)}
        </StyledGrid>
      </Responsive>
    </TitledContent>
  );
};

export default MemberPreview;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

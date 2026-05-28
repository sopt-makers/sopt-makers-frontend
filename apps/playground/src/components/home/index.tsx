import styled from '@emotion/styled';

import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import WordChainEntry from '../wordchain/WordchainEntry/WordChainEntry';
import CoffeeChatPreview from './CoffeeChatPreview';
import MenuPreview from './common/MenuPreview';
import PopularArea from './CommunityPreview/PopularArea';
import RecentArea from './CommunityPreview/RecentArea';
import MemberPreview from './MembersPreview';
import ProjectPreview from './ProjectPreview';

const HomePage = () => {
  return (
    <StyledContainer>
      <WordChainEntry />
      <StyledMemberAndCommunity>
        <MembersPreview menu={'member'}>
          <MemberPreview />
        </MembersPreview>
        <CommunityPreview menu={'community'}>
          <StyledCommunityArea>
            <RecentArea />
            <PopularArea />
          </StyledCommunityArea>
        </CommunityPreview>
      </StyledMemberAndCommunity>
      <MenuPreview menu={'project'}>
        <ProjectPreview />
      </MenuPreview>
      <MenuPreview menu={'coffeechat'}>
        <CoffeeChatPreview />
      </MenuPreview>
    </StyledContainer>
  );
};

export default HomePage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 1312px;
  padding-bottom: 142px;
  margin: 0 auto;

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    width: 978px;
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    width: 644px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 44px;
    width: 100%;
    padding: 16px 20px 96px 20px;
  }
`;

const StyledMemberAndCommunity = styled.div`
  display: flex;
  gap: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 44px;
  }
`;

const MembersPreview = styled(MenuPreview)`
  width: 296px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const CommunityPreview = styled(MenuPreview)`
  flex: 1;
  min-width: 0;
`;

const StyledCommunityArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 24px;
    justify-content: normal;
  }
`;

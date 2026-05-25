import styled from '@emotion/styled';

import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import WordChainEntry from '../wordchain/WordchainEntry/WordChainEntry';
import MenuPreview from './common/MenuPreview';
import PopularArea from './PopularArea';
import TitledContent from './common/TitledContent';
import PopularArea from './PopularArea';
import ProjectList from './ProjectPreview/ProjectList';

const HomePage = () => {
  return (
    // TODO: content 교체
    <StyledContainer>
      <WordChainEntry />
      <StyledMemberAndCommunity>
        <MembersPreview menu={'members'}>
          <div>내용</div>
        </MembersPreview>
        <CommunityPreview menu={'feed'}>
          <PopularArea />
        </CommunityPreview>
      </StyledMemberAndCommunity>
      <MenuPreview menu={'projects'}>
        <TitledContent title={'지난 기수 앱잼 프로젝트'}>
          <ProjectList />
        </TitledContent>
      </MenuPreview>
      <MenuPreview menu={'coffeechat'}>
        <div>내용</div>
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
`;

import EventPeriodBanner from '@domain/eventPeriodBanner';
import HomeCardList from '@domain/home/HomeCardList';
import QuickMenu from '@domain/home/QuickMenu';
import SuggestSection from '@domain/suggest/SuggestSection';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import Carousel from '@shared/groupBrowsing/Carousel/Carousel';
import GroupBrowsingSlider from '@shared/groupBrowsingSlider/groupBrowsingSlider';
import GuideButton from '@shared/GuideButton';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import type { NextPage } from 'next';
import { styled } from 'stitches.config';

const Home: NextPage = () => {
  const { isLaptop, isMobile } = useDisplay();

  return (
    <>
      <SCrewTab>
        <GuideButton />
      </SCrewTab>
      <EventPeriodBanner />
      <SuggestSection
        title='❤️ 열리기를 기다리는 모임'
        description='멤버들이 열리길 기대하는 모임을 둘러보고 개설해보세요'
      />
      {isMobile ? (
        <>
          <SContentTitle>⚡ 솝트만의 일회성 모임, 번쩍</SContentTitle>
          <GroupBrowsingSlider />
        </>
      ) : (
        <>
          <Flex align='center' justify='center'>
            <SContentTitle>⚡ 솝트만의 일회성 모임, 번쩍</SContentTitle>
          </Flex>
          <GroupBrowsingCarouselContainer>
            <Carousel />
          </GroupBrowsingCarouselContainer>
        </>
      )}
      {isLaptop ? (
        <>
          <Flex justify='between' style={{ marginTop: '72px' }}>
            <HomeCardList />
            <div style={{ paddingLeft: '106px' }}>
              <QuickMenu />
            </div>
          </Flex>
        </>
      ) : (
        <Flex direction='column' justify='center' align='center'>
          <QuickMenuWrapper>
            <QuickMenu />
          </QuickMenuWrapper>
          <HomeCardList />
        </Flex>
      )}

      <FloatingButton />
    </>
  );
};

export default Home;

const SCrewTab = styled(CrewTab, {
  'pb': '$45',

  '@mobile': {
    pb: '$28',
  },
});

const SContentTitle = styled('div', {
  ...fontsObject.HEADING_4_24_B,
  'color': '$white',
  'mb': '$20',
  'display': 'flex',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'width': '100%',

  '@mobile': {
    display: 'flex',
    fontSize: '16px',
  },
});

const GroupBrowsingCarouselContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});

const QuickMenuWrapper = styled('div', {
  'display': 'flex',
  'justifyContent': 'center',

  'margin': '$60 0 $72',

  '@tablet': {
    margin: '$40 0',
  },
});

import EventPeriodBanner from '@domain/eventPeriodBanner';
import HomeCardList from '@domain/home/HomeCardList';
import MumuLetterSection from '@domain/mumuLetter/MumuLetterSection';
import SuggestSection from '@domain/suggest/SuggestSection';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import GuideButton from '@shared/GuideButton';
import type { NextPage } from 'next';
import { styled } from 'stitches.config';

const Home: NextPage = () => {
  return (
    <>
      <SCrewTab>
        <GuideButton />
      </SCrewTab>
      <EventPeriodBanner />
      <MumuLetterSection title='📮 무무의 편지' description='무무가 매일 보내오는 질문에 답하고 피드로 남겨요' />
      <SuggestSection
        title='❤️ 열리기를 기다리는 모임'
        description='멤버들이 열리길 기대하는 모임을 둘러보고 개설해보세요'
      />
      <HomeCardList />

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

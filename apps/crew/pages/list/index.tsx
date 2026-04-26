import EventPeriodBanner from '@domain/eventPeriodBanner';
import { mockEventPeriodBannerData } from '@domain/eventPeriodBanner/mock';
import Filter from '@domain/list/Filter';
import MeetingListOfAll from '@domain/list/Meeting/MeetingListOfAll';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import KeywordsSettingButton from '@shared/KeywordsSettingButton';
import type { NextPage } from 'next';
import { styled } from 'stitches.config';

const Home: NextPage = () => {
  return (
    <>
      <div>
        {/*크루 탭 - 홈, 전체 모임, 내모임, 모임 신청 가이드 */}
        <CrewTab>
          <KeywordsSettingButton />
        </CrewTab>

        {/*필터 - 드롭다운, 모임 검색*/}
        <SFilterWrapper>
          <Filter />
        </SFilterWrapper>

        {/*이벤트 배너 - 이벤트 신청 안내 배너, 노출 여부는 API에서 받아오는 데이터에 따라 결정*/}
        <SEventPeriodBannerWrapper>
          <EventPeriodBanner banner={mockEventPeriodBannerData} />
        </SEventPeriodBannerWrapper>

        {/*모임 목록들 - MeetingListOfAll : 내부적으로 쿼리 파라미터 이용하여 필터링 적용*/}
        <MeetingListOfAll />
      </div>
      <FloatingButton />
    </>
  );
};

export default Home;

const SFilterWrapper = styled('div', {
  'mt': '$45',
  'mb': '$40',
  '@tablet': {
    mt: '$30',
  },
  '@mobile': {
    mb: '$28',
  },
});

const SEventPeriodBannerWrapper = styled('div', {
  '@new_mobile': {
    mt: '$28',
  },
  '@new_tablet': {
    mt: '$28',
  },
  '@new_desktop': {
    mt: '$40',
  },
  '@new_laptop': {
    mt: '$40',
  },
});

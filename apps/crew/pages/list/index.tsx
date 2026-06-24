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
      <SListLayout>
        {/*크루 탭 - 홈, 전체 모임, 내모임, 모임 신청 가이드 */}
        <CrewTab>
          <KeywordsSettingButton />
        </CrewTab>

        {/*필터 - 드롭다운, 모임 검색*/}
        <SFilterWrapper>
          <Filter />
        </SFilterWrapper>

        {/*모임 목록들 - MeetingListOfAll : 내부적으로 쿼리 파라미터 이용하여 필터링 적용*/}
        <MeetingListOfAll />
      </SListLayout>
      <FloatingButton />
    </>
  );
};

export default Home;

const SListLayout = styled('div', {
  'width': '100%',

  '@desktop': {
    width: '790px',
    mx: '$auto',
  },

  '@tablet': {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '734px',
    mx: '$0',
  },

  '@mobile': {
    position: 'static',
    left: 'auto',
    transform: 'none',
    width: '100%',
  },
});

const SFilterWrapper = styled('div', {
  'mt': '$45',
  'mb': '$40',

  '@tablet': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: '$30',
  },

  '@mobile': {
    alignItems: 'stretch',
    mb: '$28',
  },
});

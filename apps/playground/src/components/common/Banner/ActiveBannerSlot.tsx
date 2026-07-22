import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import Skeleton from '@/components/common/Skeleton';
import { LATEST_GENERATION } from '@/constants/generation';

import { ReadTimeCapsopBanner } from './ReadTimeCapsopBanner';
import RecruitingBanner from './RecruitingBanner';
import WelcomeBanner from './WelcomeBanner';
import WriteTimeCapsopBanner from './WriteTimeCapsopBanner';

/**
 * 노출할 배너를 수기로 전환하는 설정값
 *
 * [상시 이벤트] 기수마다 반복
 * - TIMECAPSOP_WRITE: 기수 시작, 타임캡솝 작성 기간
 * - TIMECAPSOP_REVEAL: 기수 종료, 타임캡솝 열람 기간
 * - RECRUITING: 메이커스 리크루팅 기간
 *
 * [기본]
 * - NONE: 진행 중인 이벤트 없음
 *
 * 일회성 이벤트 배너 추가 시 여기에 값을 추가하고 switch에 case를 작성하세요.
 * (예시: BALANCE_GAME: 'balanceGame')
 */
const BANNER_PHASE = {
  TIMECAPSOP_WRITE: 'timecapsopWrite',
  TIMECAPSOP_REVEAL: 'timecapsopReveal',
  RECRUITING: 'recruiting',
  NONE: 'none',
} as const;

type BannerPhaseType = (typeof BANNER_PHASE)[keyof typeof BANNER_PHASE];

/** [수기 변경] 이벤트 기간에 맞춰 변경해주세요. (각 phase 설명은 BANNER_PHASE 참고) */
const CURRENT_BANNER_PHASE: BannerPhaseType = BANNER_PHASE.TIMECAPSOP_REVEAL;

const renderBanner = (phase: BannerPhaseType, isLatestGeneration: boolean) => {
  switch (phase) {
    case BANNER_PHASE.TIMECAPSOP_WRITE:
      return isLatestGeneration ? <WriteTimeCapsopBanner /> : <WelcomeBanner />;
    case BANNER_PHASE.TIMECAPSOP_REVEAL:
      return isLatestGeneration ? <ReadTimeCapsopBanner /> : <WelcomeBanner />;
    case BANNER_PHASE.RECRUITING:
      return <RecruitingBanner />;
    case BANNER_PHASE.NONE:
      return <WelcomeBanner />;
    default: {
      phase satisfies never;
      return null;
    }
  }
};

const ActiveBannerSlot = () => {
  const { data: myData, isPending } = useGetMemberOfMe();

  if (isPending) return <Skeleton height={168} margin='0 0 16px 0' />;

  const isLatestGeneration = myData?.generation === LATEST_GENERATION;

  return renderBanner(CURRENT_BANNER_PHASE, isLatestGeneration);
};

export default ActiveBannerSlot;

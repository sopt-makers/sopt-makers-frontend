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
 * - timecapsopWrite: 기수 시작, 타임캡솝 작성 기간
 * - timecapsopReveal: 기수 종료, 타임캡솝 열람 기간
 * - recruiting: 메이커스 리크루팅 기간
 *
 * [기본]
 * - none: 진행 중인 이벤트 없음
 *
 * 일회성 이벤트 배너 추가 시 union에 값을 추가하고 switch에 case를 작성하세요.
 * (예시: 'balanceGame')
 */
type BannerPhaseType = 'timecapsopWrite' | 'timecapsopReveal' | 'recruiting' | 'none';

// 수기로 변경
const BANNER_PHASE: BannerPhaseType = 'timecapsopReveal';

const renderBanner = (phase: BannerPhaseType, isLatestGeneration: boolean) => {
  switch (phase) {
    case 'timecapsopWrite':
      return isLatestGeneration ? <WriteTimeCapsopBanner /> : <WelcomeBanner />;
    case 'timecapsopReveal':
      return isLatestGeneration ? <ReadTimeCapsopBanner /> : <WelcomeBanner />;
    case 'recruiting':
      return <RecruitingBanner />;
    case 'none':
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

  return renderBanner(BANNER_PHASE, isLatestGeneration);
};

export default ActiveBannerSlot;

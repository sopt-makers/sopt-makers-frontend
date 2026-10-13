import { getBannerContent } from '@/components/soptmodam/constants';
import { SOPTMODAM_BANNER_MOCK } from '@/components/soptmodam/mock';
import SoptmodamBanner from '@/components/soptmodam/SoptmodamBanner';
import { toBannerData } from '@/components/soptmodam/utils';

const SoptmodamBannerContainer = () => {
  // TODO: API 연동 시 교체
  // - 204(노출할 카드 없음) 시 null로 변환 필요
  const response = SOPTMODAM_BANNER_MOCK;

  if (!response) return null;

  const data = toBannerData(response);
  const content = getBannerContent(data);

  return data.cardType === 'VOTE' ? (
    <SoptmodamBanner variant='vote' eventName={data.eventName} content={content} />
  ) : (
    <SoptmodamBanner variant='answer' question={data.selectedQuestion} content={content} />
  );
};

export default SoptmodamBannerContainer;

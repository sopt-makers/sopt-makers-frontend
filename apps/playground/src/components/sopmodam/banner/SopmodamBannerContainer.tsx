import { getBannerContent } from '@/components/sopmodam/banner/constants';
import { SOPMODAM_BANNER_MOCK } from '@/components/sopmodam/banner/mock';
import SopmodamBanner from '@/components/sopmodam/banner/SopmodamBanner';
import { toBannerData } from '@/components/sopmodam/banner/utils';

const SopmodamBannerContainer = () => {
  // TODO: API 연동 시 교체
  // - 204(노출할 카드 없음) 시 null로 변환 필요
  const response = SOPMODAM_BANNER_MOCK;

  if (!response) return null;

  const data = toBannerData(response);
  const content = getBannerContent(data);

  return data.cardType === 'VOTE' ? (
    <SopmodamBanner variant='vote' eventName={data.eventName} content={content} />
  ) : (
    <SopmodamBanner variant='answer' question={data.selectedQuestion} content={content} />
  );
};

export default SopmodamBannerContainer;

import { useGetSopmodamCurrent } from '@/api/endpoint/sopmodam/getSopmodamCurrent';
import { getBannerContent } from '@/components/sopmodam/banner/constants';
import SopmodamBanner from '@/components/sopmodam/banner/SopmodamBanner';
import { toBannerData } from '@/components/sopmodam/banner/utils';

const SopmodamBannerContainer = () => {
  const { data: sopmodamCurrent } = useGetSopmodamCurrent();

  if (!sopmodamCurrent) return null;

  const bannerData = toBannerData(sopmodamCurrent);
  const content = getBannerContent(bannerData);

  return bannerData.cardType === 'VOTE' ? (
    <SopmodamBanner variant='vote' eventName={bannerData.eventName} content={content} />
  ) : (
    <SopmodamBanner variant='answer' question={bannerData.selectedQuestion} content={content} />
  );
};

export default SopmodamBannerContainer;

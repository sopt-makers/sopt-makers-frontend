import { useGetSopmodamCurrent } from '@/api/endpoint/sopmodam/getSopmodamCurrent';
import { getBannerContent } from '@/components/sopmodam/banner/constants';
import SopmodamBanner from '@/components/sopmodam/banner/SopmodamBanner';
import { toBannerData } from '@/components/sopmodam/banner/utils';

const SopmodamBannerContainer = () => {
  const { data: response } = useGetSopmodamCurrent();

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

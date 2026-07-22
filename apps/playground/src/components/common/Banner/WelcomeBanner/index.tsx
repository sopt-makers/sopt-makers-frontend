import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';
import bannerOthersDesktop from '@/public/icons/img/welcome-banner_other_desktop.gif';
import bannerOthersMobile from '@/public/icons/img/welcome-banner_other_mobile.gif';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type BannerType = {
  desktop: string;
  mobile: string;
};

const WelcomeOthersBanner: BannerType = {
  desktop: bannerOthersDesktop.src,
  mobile: bannerOthersMobile.src,
};

const WelcomeBanner = () => {
  return (
    <WelcomeBannerContainer>
      <Responsive only='desktop'>
        <Banner src={WelcomeOthersBanner.desktop} alt={`데스크탑 환영 배너`} />
      </Responsive>
      <Responsive only='mobile'>
        <Banner src={WelcomeOthersBanner.mobile} alt={`모바일 환영 배너`} />
      </Responsive>
    </WelcomeBannerContainer>
  );
};

export default WelcomeBanner;

const Banner = styled.img`
  width: 1440px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 375px;
  }
`;

const WelcomeBannerContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 168px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 32px;
    margin-top: 20px;
  }
`;

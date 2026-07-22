import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useState } from 'react';

import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import PlaygroundGuideModal from '@/components/resolution/submit/PlaygroundGuideModal';
import TimecapsopSubmitModal from '@/components/resolution/submit/TimecapsopSubmitModal';
import { useOpenResolutionModal } from '@/components/resolution/submit/useOpenResolutionModal';
import banner36Desktop from '@/public/icons/img/welcome-banner_36_desktop.png';
import banner36Mobile from '@/public/icons/img/welcome-banner_36_mobile.png';
import { pgColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import Responsive from '../../Responsive';
import Text from '../../Text';

type BannerType = {
  desktop: string;
  mobile: string;
};

const WriteTimeCapsopBanner = () => {
  // 타임캡솝 저장 여부 기록을 위한 코드
  const [isAlreadyRegistration, setIsAlreadyRegistration] = useState(true);
  const onNewRegistration = () => {
    setIsAlreadyRegistration(false);
  };

  // 배너 추출 가능하면 수정
  const Welcome36Banner: BannerType = {
    desktop: banner36Desktop.src,
    mobile: banner36Mobile.src,
  };

  const {
    isOpenResolutionModal,
    onCloseResolutionModal,
    handleResolutionModalOpen,
    name,
    isRegistration,
    isOpenPlaygroundGuideModal,
    onClosePlaygroundGuideModal,
    onOpenPlaygroundGuideModal,
  } = useOpenResolutionModal();

  return (
    <div onClick={handleResolutionModalOpen}>
      <ButtonWrapper>
        <WelcomText color={colors.white} typography='SUIT_18_B'>
          {'SOPT가 연결되는 곳,\n Playground에 오신 걸 환영해요!'}
        </WelcomText>
        <LoggingClick eventKey='bannerTimeCapsule' param={{ isAlreadySubmitted: isRegistration ?? false }}>
          <ResolutionButton>
            <Text color={colors.black} typography='SUIT_14_SB'>
              {'타임캡솝을 만들어보세요 >'}
            </Text>
          </ResolutionButton>
        </LoggingClick>
        <TimecapsopSubmitModal
          onClose={onCloseResolutionModal}
          userName={name ?? '나'}
          onSuccess={() => {
            onNewRegistration();
            onOpenPlaygroundGuideModal();
          }}
          isOpen={isOpenResolutionModal}
        />
      </ButtonWrapper>
      <BannerWrapper>
        <Responsive only='desktop'>
          <Banner src={Welcome36Banner.desktop} alt={`데스크탑 환영 배너`} />
        </Responsive>
        <Responsive only='mobile'>
          <Banner src={Welcome36Banner.mobile} alt={`모바일 환영 배너`} />
        </Responsive>
      </BannerWrapper>

      <PlaygroundGuideModal
        isAlreadyRegistration={isAlreadyRegistration}
        onClose={onClosePlaygroundGuideModal}
        isOpen={isOpenPlaygroundGuideModal}
      />
    </div>
  );
};

export default WriteTimeCapsopBanner;

const BannerWrapper = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 768px;
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 168px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 768px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 168px;
`;

const ResolutionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background: ${pgColors.mainGradient};
  padding: 9px 14px;

  &:hover {
    background: ${pgColors.mainHover};
  }
`;

const WelcomText = styled(Text)`
  text-align: center;
  line-height: 28px;
  white-space: pre-wrap;

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 24px;
    font-size: 16px;
  }
`;

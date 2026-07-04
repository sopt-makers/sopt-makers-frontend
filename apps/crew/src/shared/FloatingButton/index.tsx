import { useDisplay } from '@hook/useDisplay';
import KakaoFloatingButton from '@shared/FloatingButton/kakaoFloatingButton/KakaoFloatingButton';
import FloatingButtonModal from '@shared/modal/FloatingButtonModal';
import { spacing } from '@sopt-mds/design-tokens';
import { IconPlus, IconXClose } from '@sopt-mds/icons';
import { FloatingButton as MDSFloatingButton } from '@sopt-mds/ui';
import { useState } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const FloatingButton = () => {
  const [isActive, setIsActive] = useState(false);
  const { isMobile } = useDisplay();

  const handleButtonClick = () => {
    if (!isActive) {
      ampli.clickFeedAction();
    }
    setIsActive((isActive) => !isActive);
  };

  return (
    <ButtonWrapper>
      {!isActive && <KakaoFloatingButton />}

      <Container>
        <MDSFloatingButton icon={isActive ? <IconXClose /> : <IconPlus />} onClick={handleButtonClick}>
          {!isMobile && !isActive ? '등록하기' : undefined}
        </MDSFloatingButton>

        <FloatingButtonModal isActive={isActive} onClose={() => setIsActive(false)} />
      </Container>
    </ButtonWrapper>
  );
};

export default FloatingButton;

const Container = styled('div', {
  position: 'relative',
  zIndex: '$2',
});

const ButtonWrapper = styled('div', {
  'position': 'fixed',
  'bottom': '5%',
  'right': '5%',
  'zIndex': '$2',

  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'flex-end',
  'gap': spacing.s20,

  '@mobile': {
    gap: spacing.s16,
  },
});

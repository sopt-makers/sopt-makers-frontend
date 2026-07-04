import KakaoLogoIcon28 from '@assets/svg/logo_kakao_28.svg';
import KakaoLogoIcon32 from '@assets/svg/logo_kakao_32.svg';
import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

const KakaoFloatingButton = () => {
  const { isMobile } = useDisplay();

  return (
    <MiniKakaoButton
      onClick={() => {
        window.Kakao?.Channel.chat({
          channelPublicId: '_sxaIWG',
        });
      }}
    >
      {isMobile ? <KakaoLogoIcon28 /> : <KakaoLogoIcon32 />}
    </MiniKakaoButton>
  );
};

export default KakaoFloatingButton;

const MiniKakaoButton = styled('button', {
  'display': 'flex',
  'flexShrink': 0,
  'width': '56px',
  'height': '56px',
  'padding': spacing.s12,
  'borderRadius': radius.r20,
  'background': '#FEE500',

  '&:hover': {
    background: colors.base.gray50,
  },
  '&:active': {
    background: colors.base.gray100,
  },

  '@mobile': {
    'borderRadius': radius.r16,
    '&:hover': {
      background: '#FEE500',
    },
    'width': '48px',
    'height': '48px',
    'padding': spacing.s10,
  },
});

import { useUserProfileQueryOption } from '@api/user/query';
import BoltIcon from '@assets/svg/bolt_md.svg';
import FeedIcon from '@assets/svg/floating_button_feed_icon.svg';
import GroupIcon from '@assets/svg/floating_button_group_icon.svg';
import MapIcon from '@assets/svg/floating_button_map_icon.svg';
import KakaoLogoIcon from '@assets/svg/logo_kakao.svg';
import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { keyframes, styled } from 'stitches.config';

import { ampli } from '@/ampli';

interface FloatingButtonModalProps {
  isActive: boolean;
  onClose: () => void;
}

const FloatingButtonModal = ({ isActive, onClose }: FloatingButtonModalProps) => {
  const router = useRouter();
  const { isMobile } = useDisplay();
  const { data: me } = useQuery(useUserProfileQueryOption());

  const handleGroupCreateButtonClick = () => {
    ampli.clickMakeGroup({
      from_group_suggest: false,
      location: router.pathname,
      platform_type: isMobile ? 'MO' : 'PC',
      user_id: Number(me?.orgId),
    });
    router.push('/make');
  };

  const handleBoltCreateButtonClick = () => {
    //todo: 번쩍 개설을 위한 정보를 넘겨주면서 라우팅하기
    ampli.clickMakeGroup({
      from_group_suggest: false,
      location: router.pathname,
      platform_type: isMobile ? 'MO' : 'PC',
      user_id: Number(me?.orgId),
    });
    router.push('/make/flash');
  };

  const handleMapRegisterButtonClick = () => {
    // TODO: 솝맵 등록 페이지 ampli 이벤트 추가
    // ampli.clickMapRegister({ location: router.pathname });
    router.push('/map/register');
  };

  const handleFeedCreateButtonClick = () => {
    const nextQuery = { ...router.query };

    delete nextQuery.entry;
    nextQuery.modal = 'create-feed';

    router.push(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true },
    );
    onClose();
  };

  return (
    <Wrapper isActive={isActive}>
      {isActive && (
        <KakaoQuestionButton
          onClick={() => {
            window.Kakao?.Channel.chat({
              channelPublicId: '_sxaIWG',
            });
          }}
        >
          <KakaoLogoIcon width={22} height={22} />
          카카오톡 문의
        </KakaoQuestionButton>
      )}

      <Container isActive={isActive}>
        <Button onClick={handleBoltCreateButtonClick}>
          <BoltIcon width={22} height={22} />
          번쩍 개설
        </Button>
        <Button onClick={handleGroupCreateButtonClick}>
          <GroupIcon width={22} height={22} />
          모임 개설
        </Button>
        <Button onClick={handleFeedCreateButtonClick}>
          <FeedIcon width={22} height={22} />
          피드 작성
        </Button>
        <Button onClick={handleMapRegisterButtonClick}>
          <MapIcon width={22} height={22} />
          솝맵 등록
        </Button>
      </Container>
    </Wrapper>
  );
};

export default FloatingButtonModal;

const fadeIn = keyframes({
  from: { opacity: '0', transform: 'translateY(7px)' },
  to: { opacity: '1', transform: 'translateY(0px)' },
});

const fadeOut = keyframes({
  from: { transform: 'translateY(0px)' },
  to: { opacity: '0', transform: 'translateY(7px)' },
});

const Wrapper = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s8,

  'zIndex': '$3',
  'position': 'absolute',
  'bottom': `calc(${spacing.s48} + ${spacing.s20})`,
  'right': '5%',

  'transition': 'all 0.3s ease',
  'variants': {
    isActive: {
      true: {
        animation: `${fadeIn} 200ms ease-out`,
      },
      false: {
        animation: `${fadeOut} 200ms ease-out`,
        opacity: '0',
        display: 'none',
      },
    },
  },

  '@mobile': {
    bottom: `calc(${spacing.s48} + ${spacing.s16})`,
  },
});

const Container = styled('div', {
  'width': '160px',
  'height': 'auto',

  'backgroundColor': colors.bg.neutral.inverse,
  'borderRadius': '20px',
  'color': colors.fg.neutral.inverse,
  'transition': 'all 0.3s ease',
  'padding': `${spacing.s8} ${spacing.s6}`,
  'variants': {
    isActive: {
      true: {
        animation: `${fadeIn} 200ms ease-out`,
      },
      false: {
        animation: `${fadeOut} 200ms ease-out`,
        opacity: '0',
        display: 'none',
      },
    },
  },
  '@mobile': {
    width: '140px',
    height: 'auto',
    borderRadius: '18px',
    padding: `${spacing.s6} ${spacing.s4}`,
  },
});

const Button = styled('button', {
  'display': 'flex',
  'alignItems': 'center',
  'width': '100%',
  'height': '46px',
  'padding': spacing.s12,
  'gap': spacing.s4,
  'borderRadius': radius.r16,
  'backgroundColor': colors.bg.neutral.inverse,
  'color': colors.fg.neutral.inverse,
  ...typography.label2,

  '&:hover': {
    background: colors.base.gray30,
  },
  '@mobile': {
    height: '38px',
    padding: `${spacing.s8} ${spacing.s12}`,
    ...typography.label3,
  },
});

const KakaoQuestionButton = styled('button', {
  'width': '100%',
  'height': '62px',

  'display': 'flex',
  'padding': `${spacing.s20} 18px`,
  'color': colors.fg.neutral.inverse,
  ...typography.label2,

  'alignItems': 'center',
  'gap': spacing.s6,

  'borderRadius': radius.r20,
  'background': colors.bg.neutral.inverse,

  '&:hover': {
    background: colors.base.gray50,
  },
  '&:active': {
    background: colors.base.gray100,
  },

  '@mobile': {
    gap: spacing.s4,
    height: '50px',
    borderRadius: radius.r16,
    padding: `${spacing.s14} ${spacing.s16}`,
    ...typography.label3,
  },
});

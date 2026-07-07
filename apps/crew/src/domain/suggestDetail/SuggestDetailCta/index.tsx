import { useDisplay } from '@hook/useDisplay';
import { spacing } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface SuggestDetailCtaProps {
  onClick: () => void;
}

const SuggestDetailCta = ({ onClick }: SuggestDetailCtaProps) => {
  const { isMobile } = useDisplay();

  return (
    <SCtaWrapper>
      <ActionButton size='large' variant='primary' style={{ width: isMobile ? '100%' : '364px' }} onClick={onClick}>
        열어 볼래요
      </ActionButton>
    </SCtaWrapper>
  );
};

export default SuggestDetailCta;

const SCtaWrapper = styled('div', {
  'display': 'flex',
  'width': '100%',
  'justifyContent': 'center',

  '@mobile': {
    position: 'fixed',
    bottom: spacing.s32,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 40px)',
    zIndex: 10,
  },
});

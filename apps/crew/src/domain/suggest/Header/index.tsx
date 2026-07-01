import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { Callout } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

const Header = () => {
  return (
    <SHeader>
      <STitle>모임 제안하기</STitle>
      <Callout variant='information'>
        기다리는 모임을 남기면 관심 있는 멤버가 모임을 열 수 있어요. 내용은 익명으로 등록돼요.
      </Callout>
    </SHeader>
  );
};

export default Header;

const SHeader = styled('header', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s20,

  '@mobile': {
    paddingBottom: spacing.s32,
  },
});

const STitle = styled('h2', {
  ...typography.heading1,
  'color': colors.fg.neutral.bold,

  '@mobile': {
    ...typography.heading2,
  },
});

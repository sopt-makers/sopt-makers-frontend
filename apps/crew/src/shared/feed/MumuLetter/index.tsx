import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

interface MumuLetterProps {
  content: string;
}

const MumuLetter = ({ content }: MumuLetterProps) => {
  return (
    <Container>
      <MumuAvatar src='/group/assets/svg/mumu.svg' alt='' />
      <ContentWrapper>
        <Title>오늘의 질문</Title>
        <Content>{content}</Content>
      </ContentWrapper>
    </Container>
  );
};

export default MumuLetter;

const Container = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'padding': spacing.s16,
  'border': `1px solid ${colors.stroke.brand.default}`,
  'borderRadius': radius.r8,
  'gap': spacing.s10,
  'backgroundColor': colors.bg.neutral.ghost,

  '@mobile': {
    padding: spacing.s10,
    gap: spacing.s8,
  },
});

const MumuAvatar = styled('img', {
  display: 'block',
  flexShrink: 0,
  width: '48px',
  height: '48px',
});

const ContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s2,
});

const Title = styled('h3', {
  'color': colors.bg.brand.default,
  ...typography.title5,

  '@mobile': {
    ...typography.label3,
  },
});

const Content = styled('p', {
  'color': colors.fg.neutral.bold,
  ...typography.title5,

  '@mobile': {
    ...typography.body2,
  },
});

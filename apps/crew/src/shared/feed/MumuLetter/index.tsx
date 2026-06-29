import Mumu from '@assets/svg/mumu.svg';
import { colors, radiusBase, spacingBase, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

interface MumuLetterProps {
  content: string;
}

const MumuLetter = ({ content }: MumuLetterProps) => {
  return (
    <Container>
      <MumuAvatar />
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
  'padding': spacingBase.s16,
  'border': `1px solid ${colors.stroke.brand.default}`,
  'borderRadius': radiusBase.r8,
  'gap': spacingBase.s10,
  'backgroundColor': colors.bg.neutral.ghost,

  '@mobile': {
    padding: spacingBase.s10,
    gap: spacingBase.s8,
  },
});

const MumuAvatar = styled(Mumu, {
  flexShrink: 0,
  width: '48px',
  height: '48px',
});

const ContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacingBase.s2,
});

const Title = styled('h3', {
  'color': colors.bg.brand.default,
  ...typography.title4,

  '@mobile': {
    ...typography.label3,
  },
});

const Content = styled('p', {
  'color': colors.fg.neutral.bold,
  ...typography.title4,

  '@mobile': {
    ...typography.body2,
  },
});

import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { Tag } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface SuggestDetailBodyProps {
  title: string;
  expectation: string;
  keywords: string[];
}

const SuggestDetailBody = ({ title, expectation, keywords }: SuggestDetailBodyProps) => {
  return (
    <SContainer>
      <SContentContainer>
        <STitle>{title}</STitle>
        <SExpectation>{expectation}</SExpectation>
      </SContentContainer>

      <SKeywordSection>
        <SKeywordTitle>💪🏻 이런 모임을 원해요</SKeywordTitle>
        <SKeywordList>
          {keywords.map((keyword) => (
            <Tag key={keyword} size='medium' shape='pill' type='solid' variant='default'>
              {keyword}
            </Tag>
          ))}
        </SKeywordList>
      </SKeywordSection>
    </SContainer>
  );
};

export default SuggestDetailBody;

const SContainer = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
});

const SContentContainer = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: spacing.s12,
});

const STitle = styled('h1', {
  'color': colors.fg.neutral.bold,
  ...typography.heading2,

  '@mobile': {
    ...typography.title5,
  },
});

const SExpectation = styled('p', {
  'color': colors.fg.neutral.default,
  'whiteSpace': 'pre-wrap',
  'wordBreak': 'break-word',
  ...typography.body1,

  '@mobile': {
    ...typography.body2,
  },
});

const SKeywordSection = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s12,
  'marginTop': spacing.s40,

  '@mobile': {
    gap: spacing.s8,
    marginTop: spacing.s32,
  },
});

const SKeywordTitle = styled('p', {
  'color': colors.fg.neutral.bold,
  ...typography.label1,

  '@mobile': {
    ...typography.label3,
  },
});

const SKeywordList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.s6,
});

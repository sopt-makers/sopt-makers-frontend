import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';

interface SopmodamAnswerIntroProps {
  questionContent: string;
}

const SopmodamAnswerIntro = ({ questionContent }: SopmodamAnswerIntroProps) => {
  return (
    <Container>
      <Label>이번 솝모담 질문</Label>
      <Question>{questionContent}</Question>
    </Container>
  );
};

export default SopmodamAnswerIntro;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s6};
  border-bottom: 1px solid ${colors.stroke.neutral.ghost};
  padding: ${spacing.s16} 0;
`;

const Label = styled.p`
  ${typography.label3};

  color: ${colors.fg.brand.default};
`;

const Question = styled.h1`
  ${typography.title3};

  color: ${colors.fg.neutral.bold};
  overflow-wrap: anywhere;
`;

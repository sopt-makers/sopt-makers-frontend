import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';

import { useGetSopmodamAnswers } from '@/api/endpoint/sopmodam/getSopmodamAnswers';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamAnswerIntroProps {
  roundId: number;
}

const SopmodamAnswerIntro = ({ roundId }: SopmodamAnswerIntroProps) => {
  const { data } = useGetSopmodamAnswers(roundId);

  if (!data) return null;

  return (
    <SContainer>
      <SEyebrow>이번 솝모담 질문</SEyebrow>
      <SQuestionTitle>{data.question.content}</SQuestionTitle>
      <SDescription>
        <p>{data.answerCount}명의 OB가 각자의 경험을 담아주었어요.</p>
        <p>더 궁금한 이야기는 답변자에게 에스크로 질문해보세요.</p>
      </SDescription>
    </SContainer>
  );
};

export default SopmodamAnswerIntro;

const SContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
  padding: ${spacing.s24} 0;
  border-bottom: 1px solid ${colors.stroke.neutral.ghost};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: ${spacing.s16} 0;
  }
`;

const SEyebrow = styled.p`
  color: ${colors.fg.brand.default};
  ${typography.label3}
`;

const SQuestionTitle = styled.h1`
  color: ${colors.fg.neutral.bold};
  ${typography.title2}
`;

const SDescription = styled.p`
  color: ${colors.fg.neutral.bold};
  ${typography.body2}
`;

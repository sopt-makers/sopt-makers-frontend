import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamVoteIntroProps {
  eventName: string;
}

const SopmodamVoteIntro = ({ eventName }: SopmodamVoteIntroProps) => {
  return (
    <Container>
      <Title>
        <Topic>{eventName},</Topic>
        <QuestionTitle>무엇이 가장 궁금한가요?</QuestionTitle>
      </Title>
      <Description>
        질문 하나를 골라주세요.
        <br />
        가장 많은 선택을 받은 질문에 OB들이 자신의 경험을 나눠요.
      </Description>
    </Container>
  );
};

export default SopmodamVoteIntro;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
  padding: ${spacing.s16} 0;
`;

const Title = styled.h1`
  ${typography.title3};

  color: ${colors.fg.neutral.bold};
  overflow-wrap: anywhere;
`;

const Topic = styled.span`
  color: ${colors.fg.brand.default};
`;

const QuestionTitle = styled.span`
  &::before {
    content: ' ';
  }

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;

    &::before {
      content: none;
    }
  }
`;

const Description = styled.p`
  ${typography.body1};

  color: ${colors.fg.neutral.bold};
  overflow-wrap: anywhere;
`;

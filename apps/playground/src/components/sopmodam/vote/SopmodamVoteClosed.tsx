import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { ReactionButton } from '@sopt-mds/ui';
import { useRouter } from 'next/router';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const SopmodamVoteClosed = () => {
  const router = useRouter();

  return (
    <Content>
      <Message>
        <Title>더 이상 운영하지 않는 페이지예요.</Title>
        <Description>다른 페이지를 둘러보려면 홈으로 이동해 주세요.</Description>
      </Message>
      <HomeButton size='medium' onClick={() => void router.push(playgroundLink.home())}>
        Playground 홈으로 이동
      </HomeButton>
    </Content>
  );
};

export default SopmodamVoteClosed;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s20};
  align-items: center;
  padding: 265px ${spacing.s16} ${spacing.s24};
  min-height: calc(100vh - 80px);

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 235px;
    min-height: calc(100vh - 56px);
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
  text-align: center;
`;

const Title = styled.h1`
  ${typography.title3};

  color: ${colors.fg.neutral.bold};
`;

const Description = styled.p`
  ${typography.body1};

  color: ${colors.fg.neutral.subtle};
`;

const HomeButton = styled(ReactionButton)`
  border-color: ${colors.stroke.neutral.defaultFocused};
`;

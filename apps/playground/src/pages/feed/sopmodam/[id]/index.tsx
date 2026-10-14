import styled from '@emotion/styled';
import { parseRoundId } from '@shared/parseRoundId';
import { spacing } from '@sopt-mds/design-tokens';
import ErrorPage from 'next/error';

import Responsive from '@/components/common/Responsive';
import SopmodamAnswerIntro from '@/components/sopmodam/answer/SopmodamAnswerIntro';
import SopmodamAnswerList from '@/components/sopmodam/answer/SopmodamAnswerList';
import SopmodamNotifyCard from '@/components/sopmodam/answer/SopmodamNotifyCard';
import SopmodamHeader from '@/components/sopmodam/common/SopmodamHeader';
import { useSopmodamBack } from '@/components/sopmodam/common/useSopmodamBack';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const SopmodamAnswerRevealedPage = () => {
  const routeQuery = useStringRouterQuery(['id'] as const);
  const handleBack = useSopmodamBack();

  if (routeQuery.status === 'loading') {
    return null;
  }

  const roundId = routeQuery.status === 'success' ? parseRoundId(routeQuery.query.id) : null;

  if (roundId === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Container>
        <Responsive only='mobile'>
          <SopmodamHeader onBack={handleBack} />
        </Responsive>
        <Content>
          <SopmodamAnswerIntro roundId={roundId} />
          <SopmodamAnswerList roundId={roundId} />
          <SopmodamNotifyCard />
        </Content>
      </Container>
    </>
  );
};

export default SopmodamAnswerRevealedPage;

setLayout(SopmodamAnswerRevealedPage, 'headerOnlyDesktop');

const Container = styled.div`
  min-height: calc(100vh - 80px);
  padding-bottom: ${spacing.s120};

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: 100vh;
    padding-bottom: 108px;
  }
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 ${spacing.s16};
  margin: 0 auto;
  max-width: 790px;
`;

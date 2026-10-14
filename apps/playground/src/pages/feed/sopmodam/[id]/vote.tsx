import styled from '@emotion/styled';
import { parseRoundId } from '@shared/parseRoundId';
import { playgroundLink } from '@sopt/constant';
import { colors, spacing } from '@sopt-mds/design-tokens';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import { NavigationContext } from '@/components/navigation/navigationContext';
import SopmodamHeader from '@/components/sopmodam/common/SopmodamHeader';
import { sopmodamVoteMockData } from '@/components/sopmodam/vote/mockData';
import SopmodamVoteIntro from '@/components/sopmodam/vote/SopmodamVoteIntro';
import SopmodamVoteSection from '@/components/sopmodam/vote/SopmodamVoteSection';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const SopmodamVotePage = () => {
  const router = useRouter();
  const routeQuery = useStringRouterQuery(['id'] as const);
  const { getLastRouteState } = useContext(NavigationContext);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const handleBack = () => {
    const lastRoute = getLastRouteState();
    if (lastRoute?.type === 'move' && lastRoute.fromPath !== router.asPath) {
      router.back();
    } else {
      void router.replace(playgroundLink.feedList());
    }
  };

  if (routeQuery.status === 'loading') {
    return null;
  }

  const roundId = routeQuery.status === 'success' ? parseRoundId(routeQuery.query.id) : null;

  if (roundId === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>솝모담 투표 | SOPT Playground</title>
      </Head>
      <Container>
        <Responsive only='mobile'>
          <SopmodamHeader onBack={handleBack} />
        </Responsive>
        <Content>
          <SopmodamVoteIntro eventName={sopmodamVoteMockData.eventName} />
          <SopmodamVoteSection
            questions={sopmodamVoteMockData.questions}
            canVote={sopmodamVoteMockData.canVote}
            hasVoted={sopmodamVoteMockData.hasVoted}
            myVoteQuestionId={sopmodamVoteMockData.myVoteQuestionId}
            selectedQuestionId={selectedQuestionId}
            isSubmitting={false}
            onSelect={setSelectedQuestionId}
            // 실제 투표 저장은 API 연동 작업에서 연결합니다.
            onSubmit={() => {}}
          />
        </Content>
      </Container>
    </>
  );
};

export default SopmodamVotePage;

setLayout(SopmodamVotePage, 'headerOnlyDesktop');

const Container = styled.div`
  background-color: ${colors.bg.layer.basement};
  min-height: calc(100vh - 80px);

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: 100vh;
  }
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s16};
  margin: 0 auto;
  padding: ${spacing.s24} ${spacing.s16};
  width: 100%;
  max-width: 768px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 0;
  }
`;

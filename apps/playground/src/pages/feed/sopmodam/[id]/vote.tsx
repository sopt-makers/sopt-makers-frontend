import styled from '@emotion/styled';
import { parseRoundId } from '@shared/parseRoundId';
import { colors, spacing } from '@sopt-mds/design-tokens';
import ErrorPage from 'next/error';
import { useState } from 'react';

import Responsive from '@/components/common/Responsive';
import SopmodamHeader from '@/components/sopmodam/common/SopmodamHeader';
import { useSopmodamBack } from '@/components/sopmodam/common/useSopmodamBack';
import { getVoteStatus } from '@/components/sopmodam/vote/getVoteStatus';
import { sopmodamVoteMockData } from '@/components/sopmodam/vote/mockData';
import SopmodamVoteIntro from '@/components/sopmodam/vote/SopmodamVoteIntro';
import SopmodamVoteSection from '@/components/sopmodam/vote/SopmodamVoteSection';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const SopmodamVotePage = () => {
  const routeQuery = useStringRouterQuery(['id'] as const);
  const handleBack = useSopmodamBack();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  if (routeQuery.status === 'loading') {
    return null;
  }

  const roundId = routeQuery.status === 'success' ? parseRoundId(routeQuery.query.id) : null;

  if (roundId === null) {
    return <ErrorPage statusCode={404} />;
  }

  const voteStatus = getVoteStatus(sopmodamVoteMockData);

  return (
    <Container>
      <Responsive only='mobile'>
        <SopmodamHeader onBack={handleBack} />
      </Responsive>
      <Content>
        <SopmodamVoteIntro eventName={sopmodamVoteMockData.eventName} />
        <SopmodamVoteSection
          questions={sopmodamVoteMockData.questions}
          status={voteStatus}
          selectedQuestionId={selectedQuestionId}
          isSubmitting={false}
          onSelect={setSelectedQuestionId}
          // 실제 투표 저장은 API 연동 작업에서 연결합니다.
          onSubmit={() => {}}
        />
      </Content>
    </Container>
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

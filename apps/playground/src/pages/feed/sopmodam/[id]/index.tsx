import { parseRoundId } from '@shared/parseRoundId';
import ErrorPage from 'next/error';

import { LoggingPageView } from '@/components/eventLogger/components/LoggingPageView';
import SopmodamAnswerDetail from '@/components/sopmodam/answer/revealed/SopmodamAnswerDetail';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const SopmodamAnswerRevealedPage = () => {
  const routeQuery = useStringRouterQuery(['id'] as const);

  if (routeQuery.status === 'loading') {
    return null;
  }

  const roundId = routeQuery.status === 'success' ? parseRoundId(routeQuery.query.id) : null;

  if (roundId === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <LoggingPageView eventKey='sopmodamResultPage'>
      <SopmodamAnswerDetail roundId={roundId} />
    </LoggingPageView>
  );
};

export default SopmodamAnswerRevealedPage;

setLayout(SopmodamAnswerRevealedPage, 'headerOnlyDesktop');

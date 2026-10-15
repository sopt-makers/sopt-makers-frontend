import styled from '@emotion/styled';
import { parseRoundId } from '@shared/parseRoundId';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from '@toss/error-boundary';
import { isAxiosError } from 'axios';
import ErrorPage from 'next/error';
import { Suspense, useEffect, useRef } from 'react';

import type { SopmodamMyAnswerQueryResult } from '@/api/endpoint/sopmodam/getSopmodamMyAnswer';
import { getSopmodamMyAnswer } from '@/api/endpoint/sopmodam/getSopmodamMyAnswer';
import Loading from '@/components/common/Loading';
import SopmodamAnswerUploadContent from '@/components/sopmodam/answer/upload/SopmodamAnswerUploadContent';
import SopmodamLayout from '@/components/sopmodam/common/SopmodamLayout';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const SopmodamAnswerUploadPage = () => {
  const routeQuery = useStringRouterQuery(['id'] as const);
  const queryClient = useQueryClient();
  const errorBoundaryRef = useRef<{ reset: () => void }>(null);
  const roundId = routeQuery.status === 'success' ? parseRoundId(routeQuery.query.id) : null;
  const loadingFallback = (
    <SopmodamLayout>
      <LoadingContent role='status' aria-label='내 경험담을 불러오는 중'>
        <Loading />
      </LoadingContent>
    </SopmodamLayout>
  );

  useEffect(() => {
    if (roundId === null) {
      return;
    }
    const state = queryClient.getQueryState<SopmodamMyAnswerQueryResult>(getSopmodamMyAnswer.cacheKey(roundId));
    if ((state?.status === 'error' && state.data === undefined) || state?.data?.type === 'error') {
      errorBoundaryRef.current?.reset();
    }
  }, [queryClient, roundId]);

  if (routeQuery.status === 'loading') {
    return loadingFallback;
  }
  if (roundId === null) {
    return (
      <SopmodamLayout>
        <ErrorPage statusCode={404} />
      </SopmodamLayout>
    );
  }

  return (
    <ErrorBoundary
      key={roundId}
      ref={errorBoundaryRef}
      onReset={() => {
        void queryClient.resetQueries({ queryKey: getSopmodamMyAnswer.cacheKey(roundId), exact: true });
      }}
      renderFallback={({ error }) => (
        <SopmodamLayout>
          <ErrorPage statusCode={isAxiosError(error) ? (error.response?.status ?? 500) : 500} />
        </SopmodamLayout>
      )}
    >
      <Suspense fallback={loadingFallback}>
        <SopmodamAnswerUploadContent roundId={roundId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default SopmodamAnswerUploadPage;

setLayout(SopmodamAnswerUploadPage, 'headerOnlyDesktop');

const LoadingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: calc(100vh - 44px);
  }
`;

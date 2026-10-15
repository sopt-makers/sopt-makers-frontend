import styled from '@emotion/styled';
import { spacing } from '@sopt-mds/design-tokens';
import { isAxiosError } from 'axios';
import ErrorPage from 'next/error';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { useGetSopmodamQuestionsSuspenseQuery } from '@/api/endpoint/sopmodam/getSopmodamQuestions';
import { getVoteStatus } from '@/components/sopmodam/vote/getVoteStatus';
import SopmodamVoteClosed from '@/components/sopmodam/vote/SopmodamVoteClosed';
import SopmodamVoteIntro from '@/components/sopmodam/vote/SopmodamVoteIntro';
import SopmodamVoteSection from '@/components/sopmodam/vote/SopmodamVoteSection';
import { useSubmitSopmodamVote } from '@/components/sopmodam/vote/useSubmitSopmodamVote';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamVoteContentProps {
  roundId: number;
  header: ReactNode;
  closedHeader: ReactNode;
}

const SopmodamVoteContent = ({ roundId, header, closedHeader }: SopmodamVoteContentProps) => {
  const { data: result, isFetching, isError, error } = useGetSopmodamQuestionsSuspenseQuery(roundId);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const { submitVote, isSubmitting, isVoteConflictUnresolved } = useSubmitSopmodamVote({
    roundId,
    data: result.type === 'success' ? result.data : null,
    isFetching,
  });

  if (result.type === 'error') {
    return (
      <>
        {header}
        <ErrorPage statusCode={result.statusCode} />
      </>
    );
  }

  const { data } = result;
  const voteStatus = getVoteStatus(data);
  const isVoteClosed = data.dDay === null;
  const isBusy = isSubmitting || isFetching;

  if (isVoteClosed) {
    return (
      <>
        {closedHeader}
        <SopmodamVoteClosed />
      </>
    );
  }

  const queryErrorStatus = getErrorStatus(error);
  // 등록이 확인된 뒤 재조회만 실패한 경우에는 완료 상태를 유지합니다.
  const shouldShowQueryError =
    isError && (!data.hasVoted || (queryErrorStatus !== undefined && queryErrorStatus < 500));
  if (shouldShowQueryError) {
    return (
      <>
        {header}
        <ErrorPage statusCode={queryErrorStatus ?? 500} />
      </>
    );
  }

  if (isVoteConflictUnresolved) {
    return (
      <>
        {header}
        <ErrorPage statusCode={409} />
      </>
    );
  }

  return (
    <>
      {header}
      <Content>
        <SopmodamVoteIntro eventName={data.eventName} />
        <SopmodamVoteSection
          questions={data.questions}
          status={voteStatus}
          selectedQuestionId={selectedQuestionId}
          isBusy={isBusy}
          onSelect={setSelectedQuestionId}
          onSubmit={(questionId) => void submitVote(questionId)}
        />
      </Content>
    </>
  );
};

export default SopmodamVoteContent;

const getErrorStatus = (error: unknown) => (isAxiosError(error) ? error.response?.status : undefined);

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

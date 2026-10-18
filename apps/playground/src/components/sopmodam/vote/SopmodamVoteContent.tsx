import styled from '@emotion/styled';
import { spacing } from '@sopt-mds/design-tokens';
import { isAxiosError } from 'axios';
import ErrorPage from 'next/error';
import { useState } from 'react';

import { useGetSopmodamQuestionsSuspenseQuery } from '@/api/endpoint/sopmodam/getSopmodamQuestions';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import SopmodamLayout from '@/components/sopmodam/common/SopmodamLayout';
import { getVoteStatus } from '@/components/sopmodam/vote/getVoteStatus';
import SopmodamVoteClosed from '@/components/sopmodam/vote/SopmodamVoteClosed';
import SopmodamVoteIntro from '@/components/sopmodam/vote/SopmodamVoteIntro';
import SopmodamVoteSection from '@/components/sopmodam/vote/SopmodamVoteSection';
import { useSubmitSopmodamVote } from '@/components/sopmodam/vote/useSubmitSopmodamVote';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamVoteContentProps {
  roundId: number;
}

const SopmodamVoteContent = ({ roundId }: SopmodamVoteContentProps) => {
  const { logClickEvent } = useEventLogger();
  const { data: result, isError, error } = useGetSopmodamQuestionsSuspenseQuery(roundId);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const { submitVote, isSubmitting, isVoteConflictUnresolved } = useSubmitSopmodamVote({
    roundId,
    data: result.type === 'success' ? result.data : null,
  });

  const handleSubmit = async (questionId: number) => {
    const succeeded = await submitVote(questionId);

    if (succeeded) {
      logClickEvent('sopmodamVote');
    }
  };

  if (result.type === 'error') {
    return (
      <SopmodamLayout>
        <ErrorPage statusCode={result.statusCode} />
      </SopmodamLayout>
    );
  }

  const { data } = result;
  const voteStatus = getVoteStatus(data);
  const isVoteClosed = data.dDay === null;

  if (isVoteClosed) {
    return (
      <SopmodamLayout headerType='playground'>
        <SopmodamVoteClosed />
      </SopmodamLayout>
    );
  }

  const queryErrorStatus = getErrorStatus(error);
  // 등록이 확인된 뒤 재조회만 실패한 경우에는 완료 상태를 유지합니다.
  const shouldShowQueryError =
    isError && (!data.hasVoted || (queryErrorStatus !== undefined && queryErrorStatus < 500));
  if (shouldShowQueryError) {
    return (
      <SopmodamLayout>
        <ErrorPage statusCode={queryErrorStatus ?? 500} />
      </SopmodamLayout>
    );
  }

  if (isVoteConflictUnresolved) {
    return (
      <SopmodamLayout>
        <ErrorPage statusCode={409} />
      </SopmodamLayout>
    );
  }

  return (
    <SopmodamLayout>
      <Content>
        <SopmodamVoteIntro eventName={data.eventName} />
        <SopmodamVoteSection
          questions={data.questions}
          status={voteStatus}
          selectedQuestionId={selectedQuestionId}
          isSubmitting={isSubmitting}
          onSelect={setSelectedQuestionId}
          onSubmit={(questionId) => void handleSubmit(questionId)}
        />
      </Content>
    </SopmodamLayout>
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

import styled from '@emotion/styled';
import { spacing } from '@sopt-mds/design-tokens';
import ErrorPage from 'next/error';

import { isSopmodamAnswersUnavailableError, useGetSopmodamAnswers } from '@/api/endpoint/sopmodam/getSopmodamAnswers';
import Responsive from '@/components/common/Responsive';
import SopmodamAnswerIntro from '@/components/sopmodam/answer/SopmodamAnswerIntro';
import SopmodamAnswerList from '@/components/sopmodam/answer/SopmodamAnswerList';
import SopmodamNotifyCard from '@/components/sopmodam/answer/SopmodamNotifyCard';
import SopmodamHeader from '@/components/sopmodam/common/SopmodamHeader';
import { useSopmodamBack } from '@/components/sopmodam/common/useSopmodamBack';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamAnswerDetailProps {
  roundId: number;
}

const SopmodamAnswerDetail = ({ roundId }: SopmodamAnswerDetailProps) => {
  const handleBack = useSopmodamBack();
  const { data, isLoading, error } = useGetSopmodamAnswers(roundId);

  if (error) {
    const statusCode = isSopmodamAnswersUnavailableError(error) ? 404 : 500;
    return <ErrorPage statusCode={statusCode} />;
  }

  return (
    <SContainer>
      <Responsive only='mobile'>
        <SopmodamHeader onBack={handleBack} />
      </Responsive>
      <SContent>
        <SopmodamAnswerIntro isLoading={isLoading} question={data?.question.content} answerCount={data?.answerCount} />
        <SopmodamAnswerList isLoading={isLoading} answers={data?.answers} />
        <SopmodamNotifyCard />
      </SContent>
    </SContainer>
  );
};

export default SopmodamAnswerDetail;

const SContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding-bottom: ${spacing.s120};

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: 100vh;
    padding-bottom: 108px;
  }
`;

const SContent = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 ${spacing.s16};
  margin: 0 auto;
  max-width: 790px;
`;

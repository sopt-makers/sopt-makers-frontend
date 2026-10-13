import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { useToast } from '@sopt-makers/ui';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconCheckCircleFilled } from '@sopt-mds/icons';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import { NavigationContext } from '@/components/navigation/navigationContext';
import { saveSopmodamAnswerMock, sopmodamAnswerMockData } from '@/components/sopmodam/answer/mockData';
import SopmodamAnswerContent from '@/components/sopmodam/answer/SopmodamAnswerContent';
import SopmodamAnswerForm from '@/components/sopmodam/answer/SopmodamAnswerForm';
import SopmodamAnswerIntro from '@/components/sopmodam/answer/SopmodamAnswerIntro';
import type { SopmodamAnswer } from '@/components/sopmodam/answer/types';
import SopmodamHeader from '@/components/sopmodam/common/SopmodamHeader';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';
import { parseRoundId } from '@/utils/parseRoundId';

const SopmodamAnswerUploadPage = () => {
  const router = useRouter();
  const { getLastRouteState } = useContext(NavigationContext);
  const { open: openToast } = useToast();
  const roundId = parseRoundId(router.query.id);
  const [myAnswer, setMyAnswer] = useState<SopmodamAnswer | null>(sopmodamAnswerMockData.myAnswer);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const handleBack = () => {
    const lastRoute = getLastRouteState();
    if (lastRoute?.type === 'move' && lastRoute.fromPath !== router.asPath) {
      router.back();
    } else {
      void router.replace(playgroundLink.feedList());
    }
  };

  const handleSubmit = async (content: string) => {
    if (!sopmodamAnswerMockData.canWrite || submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    const isUpdate = myAnswer !== null;

    try {
      // API 연동 시 실제 저장 응답과 내 답변 query 갱신으로 교체합니다.
      const answer = await saveSopmodamAnswerMock(content, myAnswer?.answerId ?? null);
      setMyAnswer(answer);
      setIsEditing(false);
      openToast({
        icon: (
          <IconCheckCircleFilled
            width={20}
            height={20}
            color={colors.fg.success.default}
            aria-hidden='true'
            focusable='false'
          />
        ),
        content: isUpdate ? '경험담을 수정했어요.' : '경험담을 담았어요.',
        style: {
          root: {
            width: 'min(380px, calc(100vw - 40px))',
            borderRadius: 14,
            padding: '14px 16px',
            backgroundColor: colors.bg.neutral.inverse,
          },
          content: { ...typography.label3, color: colors.fg.neutral.inverse },
        },
      });
    } catch {
      // 저장 실패 시 폼과 입력값을 유지합니다. 오류 안내는 API 연동 시 공통 처리에 연결합니다.
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!router.isReady) {
    return null;
  }

  if (roundId === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>솝모담 경험담 작성 | SOPT Playground</title>
      </Head>
      <Container>
        <Responsive only='mobile'>
          <SopmodamHeader onBack={handleBack} />
        </Responsive>
        <Content>
          <SopmodamAnswerIntro questionContent={sopmodamAnswerMockData.questionContent} />
          {myAnswer && !isEditing ? (
            <SopmodamAnswerContent
              answer={myAnswer}
              releaseDate={sopmodamAnswerMockData.releaseDate}
              canWrite={sopmodamAnswerMockData.canWrite}
              onEdit={() => setIsEditing(true)}
            />
          ) : (
            <SopmodamAnswerForm
              initialContent={myAnswer?.content ?? ''}
              mode={myAnswer ? 'edit' : 'create'}
              releaseDate={sopmodamAnswerMockData.releaseDate}
              canWrite={sopmodamAnswerMockData.canWrite}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />
          )}
        </Content>
      </Container>
    </>
  );
};

export default SopmodamAnswerUploadPage;

setLayout(SopmodamAnswerUploadPage, 'headerOnlyDesktop');

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
  max-width: 790px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 0;
  }
`;

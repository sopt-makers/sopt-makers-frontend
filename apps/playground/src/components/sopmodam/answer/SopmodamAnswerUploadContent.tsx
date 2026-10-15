import styled from '@emotion/styled';
import { useToast } from '@sopt-makers/ui';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconCheckCircleFilled } from '@sopt-mds/icons';
import ErrorPage from 'next/error';
import { useState } from 'react';

import { getSopmodamAnswerEndTime } from '@/api/endpoint/sopmodam/answerSchemas';
import { useGetSopmodamMyAnswerSuspenseQuery } from '@/api/endpoint/sopmodam/getSopmodamMyAnswer';
import SopmodamAnswerContent from '@/components/sopmodam/answer/SopmodamAnswerContent';
import SopmodamAnswerForm from '@/components/sopmodam/answer/SopmodamAnswerForm';
import SopmodamAnswerIntro from '@/components/sopmodam/answer/SopmodamAnswerIntro';
import type { SopmodamAnswerFormState } from '@/components/sopmodam/answer/types';
import { useSubmitSopmodamAnswer } from '@/components/sopmodam/answer/useSubmitSopmodamAnswer';
import SopmodamLayout from '@/components/sopmodam/common/SopmodamLayout';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamAnswerUploadContentProps {
  roundId: number;
}

const SopmodamAnswerUploadContent = ({ roundId }: SopmodamAnswerUploadContentProps) => {
  const { open: openToast } = useToast();
  const { data: result, isError } = useGetSopmodamMyAnswerSuspenseQuery(roundId);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // 오류 화면으로 전환돼도 제출 전 입력값과 수정 기준은 유지합니다.
  const [form, setForm] = useState<SopmodamAnswerFormState>({ type: 'create', content: '' });
  const { submitAnswer, isSubmitting, saveErrorStatus } = useSubmitSopmodamAnswer({
    roundId,
    data: result.type === 'success' ? result.data : null,
    isQueryError: isError,
  });

  const handleSubmit = async () => {
    const isSaved = await submitAnswer(form);
    if (!isSaved) {
      return;
    }
    setIsFormOpen(false);
    setForm({ type: 'create', content: '' });
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
      content: form.type === 'update' ? '경험담을 수정했어요.' : '경험담을 담았어요.',
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
  };

  if (result.type === 'error') {
    return (
      <SopmodamLayout>
        <ErrorPage statusCode={result.statusCode} />
      </SopmodamLayout>
    );
  }
  if (saveErrorStatus === 403 || saveErrorStatus === 404 || saveErrorStatus === 409) {
    return (
      <SopmodamLayout>
        <ErrorPage statusCode={saveErrorStatus} />
      </SopmodamLayout>
    );
  }

  const { data } = result;
  const shouldShowForm = isFormOpen || data.answer === null;
  const matchesAnswer = form.type === 'create' ? data.answer === null : data.answer?.answerId === form.answerId;
  const releaseDate = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: 'long',
    day: 'numeric',
  }).format(getSopmodamAnswerEndTime(data.answerEndAt));

  const handleContentChange = (content: string) => {
    setIsFormOpen(true);
    setForm((previous) => ({ ...previous, content }));
  };

  const handleEdit = () => {
    const { answer, canEdit } = data;
    if (!canEdit || answer === null) {
      return;
    }

    setForm({
      type: 'update',
      answerId: answer.answerId,
      originalContent: answer.content,
      content: answer.content,
    });
    setIsFormOpen(true);
  };

  return (
    <SopmodamLayout>
      <Content>
        <SopmodamAnswerIntro questionContent={data.question.content} />
        {shouldShowForm && (
          <SopmodamAnswerForm
            form={form}
            canEdit={data.canEdit && !isError && matchesAnswer}
            releaseDate={releaseDate}
            isSubmitting={isSubmitting}
            onChange={handleContentChange}
            onSubmit={() => void handleSubmit()}
          />
        )}
        {!shouldShowForm && data.answer !== null && (
          <SopmodamAnswerContent
            content={data.answer.content}
            releaseDate={releaseDate}
            onEdit={data.canEdit ? handleEdit : undefined}
          />
        )}
      </Content>
    </SopmodamLayout>
  );
};

export default SopmodamAnswerUploadContent;

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

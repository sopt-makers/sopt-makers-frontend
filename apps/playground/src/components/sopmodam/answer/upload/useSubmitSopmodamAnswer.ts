import { isAxiosError } from 'axios';
import { useRef } from 'react';

import type { SopmodamMyAnswerResponse } from '@/api/endpoint/sopmodam/answerSchemas';
import { SopmodamAnswerContentSchema } from '@/api/endpoint/sopmodam/answerSchemas';
import { useSaveSopmodamAnswerMutation } from '@/api/endpoint/sopmodam/useSaveSopmodamAnswerMutation';
import type { SopmodamAnswerFormState } from '@/components/sopmodam/answer/upload/types';

interface UseSubmitSopmodamAnswerOptions {
  roundId: number;
  data: Pick<SopmodamMyAnswerResponse, 'answer' | 'canEdit'> | null;
  isQueryError: boolean;
}

export const useSubmitSopmodamAnswer = ({ roundId, data, isQueryError }: UseSubmitSopmodamAnswerOptions) => {
  const { mutateAsync, isPending: isSubmitting, error, variables } = useSaveSopmodamAnswerMutation();
  const submittingRef = useRef(false);

  const submitAnswer = async (form: SopmodamAnswerFormState): Promise<boolean> => {
    if (!data?.canEdit || isQueryError || isSubmitting || submittingRef.current) {
      return false;
    }
    const matchesAnswer = form.type === 'create' ? data.answer === null : data.answer?.answerId === form.answerId;
    const isChanged = form.type === 'create' || form.content !== form.originalContent;
    if (!matchesAnswer || !isChanged || !SopmodamAnswerContentSchema.safeParse(form.content).success) {
      return false;
    }

    // isPending이 반영되기 전의 연속 제출도 차단합니다.
    submittingRef.current = true;
    try {
      await mutateAsync(
        form.type === 'create'
          ? { type: 'create', roundId, content: form.content }
          : { type: 'update', roundId, answerId: form.answerId, content: form.content },
      );
      return true;
    } catch {
      return false;
    } finally {
      submittingRef.current = false;
    }
  };

  const saveErrorStatus = variables?.roundId === roundId && isAxiosError(error) ? error.response?.status : undefined;

  return { submitAnswer, isSubmitting, saveErrorStatus };
};

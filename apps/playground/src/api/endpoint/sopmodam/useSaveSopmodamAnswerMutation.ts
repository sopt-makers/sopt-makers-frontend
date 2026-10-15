import type { QueryClient } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SopmodamAnswer } from '@/api/endpoint/sopmodam/answerSchemas';
import { SopmodamAnswerContentSchema, SopmodamAnswerSchema } from '@/api/endpoint/sopmodam/answerSchemas';
import type { SopmodamMyAnswerQueryResult } from '@/api/endpoint/sopmodam/getSopmodamMyAnswer';
import { getSopmodamMyAnswer, getSopmodamMyAnswerQueryOptions } from '@/api/endpoint/sopmodam/getSopmodamMyAnswer';
import { postSopmodamAnswer } from '@/api/endpoint/sopmodam/postSopmodamAnswer';
import { putSopmodamAnswer } from '@/api/endpoint/sopmodam/putSopmodamAnswer';

type SaveSopmodamAnswerRequest = { roundId: number; content: string } & (
  | { type: 'create' }
  | { type: 'update'; answerId: number }
);

export const useSaveSopmodamAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: SaveSopmodamAnswerRequest) => {
      SopmodamAnswerContentSchema.parse(request.content);
      try {
        const response = SopmodamAnswerSchema.parse(
          request.type === 'create'
            ? await postSopmodamAnswer.request(request.roundId, request.content)
            : await putSopmodamAnswer.request(request.answerId, request.content),
        );
        if (request.type === 'update' && response.answerId !== request.answerId) {
          throw new Error('요청한 답변과 수정된 답변이 일치하지 않습니다.');
        }
        return { answer: response, source: 'write' as const };
      } catch (error) {
        const result = await recheckMyAnswer(queryClient, request.roundId);
        const answer = result?.type === 'success' ? result.data.answer : null;
        // 응답만 유실된 경우에도 제출 내용과 서버의 저장 결과가 일치해야 완료로 처리합니다.
        if (
          answer?.content === request.content &&
          (request.type === 'create' || answer.answerId === request.answerId)
        ) {
          return { answer, source: 'recheck' as const };
        }
        throw error;
      }
    },
    onSuccess: async ({ answer, source }, { roundId }) => {
      const updates = [
        // 배너 API(#212)의 조회 키. 해당 쿼리가 없는 경우에는 요청하지 않습니다.
        queryClient.invalidateQueries({ queryKey: ['GET', 'api/v1/sopmodam/current'], exact: true }),
      ];
      if (source === 'write') {
        updates.push(syncSavedAnswer(queryClient, roundId, answer));
      }
      await Promise.all(updates);
    },
  });
};

const recheckMyAnswer = async (queryClient: QueryClient, roundId: number) => {
  const queryKey = getSopmodamMyAnswer.cacheKey(roundId);
  await queryClient.cancelQueries({ queryKey, exact: true });
  try {
    return await queryClient.fetchQuery({
      ...getSopmodamMyAnswerQueryOptions(roundId),
      staleTime: 0,
      retry: false,
    });
  } catch {
    return null;
  }
};

const syncSavedAnswer = async (queryClient: QueryClient, roundId: number, answer: SopmodamAnswer) => {
  const queryKey = getSopmodamMyAnswer.cacheKey(roundId);
  await queryClient.cancelQueries({ queryKey, exact: true });
  queryClient.setQueryData<SopmodamMyAnswerQueryResult>(queryKey, (previous) =>
    previous?.type === 'success' ? { ...previous, data: { ...previous.data, answer } } : previous,
  );
  await queryClient.invalidateQueries({ queryKey, exact: true, refetchType: 'all' });
};

import { usePostSettlementRoundMutation } from '@api/settlement/mutation';
import { useSettlementDetailQueryOption } from '@api/settlement/query';
import { useUserProfileQueryOption } from '@api/user/query';
import RoundForm from '@domain/settlement/form/RoundForm';
import type { RoundFieldValues } from '@domain/settlement/form/schema';
import { getSettlementRole } from '@domain/settlement/util';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

import { ampli } from '@/ampli';

const CreateRoundPage = () => {
  const router = useRouter();
  const meetingId = Number(router.query.id);
  const isValidId = typeof router.query.id === 'string' && Number.isSafeInteger(meetingId) && meetingId > 0;
  const { mutateAsync: createRound } = usePostSettlementRoundMutation();
  const { data: user } = useQuery(useUserProfileQueryOption());
  const queryClient = useQueryClient();
  const detailQuery = useSettlementDetailQueryOption(meetingId);
  useQuery({ ...detailQuery, enabled: router.isReady && isValidId });

  const handleSubmit = async (values: RoundFieldValues) => {
    try {
      const { roundId } = await createRound({ meetingId, data: values });
      const settlement = queryClient.getQueryData(detailQuery.queryKey);
      ampli.completeAddSettlementRound({
        group_id: meetingId,
        settlement_role: settlement ? getSettlementRole(settlement) : undefined,
        settlement_round_id: roundId,
        settlement_round_no: settlement?.rounds.find((round) => round.roundId === roundId)?.roundNumber,
        user_id: user?.orgId,
      });
    } catch {
      // TODO: 디자인 확인 후 실패 안내 UX 수정
      alert('회차를 추가하지 못했어요. 잠시 후 다시 시도해주세요.');
      return;
    }

    await router.push(`/settlement/detail?id=${meetingId}`);
  };

  if (!router.isReady) return null;
  if (!isValidId) return <ErrorPage statusCode={404} />;

  return <RoundForm key={meetingId} mode='create' onSubmit={handleSubmit} />;
};

export default CreateRoundPage;

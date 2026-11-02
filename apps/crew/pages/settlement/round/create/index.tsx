import { usePostSettlementRoundMutation } from '@api/settlement/mutation';
import RoundForm from '@domain/settlement/form/RoundForm';
import type { RoundFieldValues } from '@domain/settlement/form/schema';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

const CreateRoundPage = () => {
  const router = useRouter();
  const meetingId = Number(router.query.id);
  const isValidId = typeof router.query.id === 'string' && Number.isSafeInteger(meetingId) && meetingId > 0;
  const { mutateAsync: createRound } = usePostSettlementRoundMutation();

  const handleSubmit = async (values: RoundFieldValues) => {
    try {
      await createRound({ meetingId, data: values });
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

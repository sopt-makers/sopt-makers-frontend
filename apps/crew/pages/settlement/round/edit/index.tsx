import { usePutSettlementRoundMutation } from '@api/settlement/mutation';
import { useSettlementDetailQueryOption } from '@api/settlement/query';
import Loader from '@common/loader/Loader';
import RoundForm from '@domain/settlement/form/RoundForm';
import type { RoundFieldValues } from '@domain/settlement/form/schema';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

const EditRoundPage = () => {
  const router = useRouter();
  const meetingId = Number(router.query.id);
  const roundId = Number(router.query.roundId);
  const isValidId =
    typeof router.query.id === 'string' &&
    Number.isSafeInteger(meetingId) &&
    meetingId > 0 &&
    typeof router.query.roundId === 'string' &&
    Number.isSafeInteger(roundId) &&
    roundId > 0;

  const {
    data: settlement,
    error,
    isError,
    isPending,
    isFetchedAfterMount,
  } = useQuery({
    ...useSettlementDetailQueryOption(meetingId),
    enabled: router.isReady && isValidId,
    staleTime: 0,
  });

  const { mutateAsync: updateRound } = usePutSettlementRoundMutation();

  const handleSubmit = async (values: RoundFieldValues) => {
    try {
      await updateRound({ meetingId, roundId, data: values });
    } catch {
      // TODO: 디자인 확인 후 실패 안내 UX 수정
      alert('회차를 수정하지 못했어요. 잠시 후 다시 시도해주세요.');
      return;
    }
    await router.push(`/settlement/detail?id=${meetingId}`);
  };

  if (!router.isReady) return null;
  if (!isValidId) return <ErrorPage statusCode={404} />;
  if (isPending || !isFetchedAfterMount) return <Loader />;
  if (isError) {
    return <ErrorPage statusCode={isAxiosError(error) && error.response?.status === 404 ? 404 : 500} />;
  }

  const round = settlement.rounds.find((round) => round.roundId === roundId);

  if (!round) return <ErrorPage statusCode={404} />;

  const initialValues: RoundFieldValues = {
    place: round.place ?? '',
    naverMapLink: round.naverMapLink ?? '',
    kakaoMapLink: round.kakaoMapLink ?? '',
    startTime: round.startTime ?? '',
  };

  return (
    <RoundForm key={`${meetingId}:${roundId}`} mode='edit' initialValues={initialValues} onSubmit={handleSubmit} />
  );
};

export default EditRoundPage;

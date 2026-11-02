import { useDeleteSettlementMutation, usePutSettlementMutation } from '@api/settlement/mutation';
import { useSettlementDetailQueryOption } from '@api/settlement/query';
import Loader from '@common/loader/Loader';
import DeleteDialog from '@domain/settlement/DeleteDialog';
import type { SettlementFormValues } from '@domain/settlement/form/schema';
import SettlementForm from '@domain/settlement/form/SettlementForm';
import useModal from '@hook/useModal';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

const EditSettlementPage = () => {
  const router = useRouter();
  const meetingId = Number(router.query.id);
  const isValidId = Number.isSafeInteger(meetingId) && meetingId > 0;
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
  const { mutateAsync: updateSettlement } = usePutSettlementMutation();
  const { mutateAsync: deleteSettlement, isPending: isDeleting } = useDeleteSettlementMutation();
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();

  const handleSubmit = async (values: SettlementFormValues) => {
    try {
      await updateSettlement({ meetingId, data: values });
      await router.push(`/settlement/detail?id=${meetingId}`);
    } catch {
      // TODO: 디자인 확인 후 실패 안내 UX 수정
      alert('회식을 수정하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSettlement(meetingId);
    } catch {
      // TODO: 디자인 확인 후 실패 안내 UX 수정
      alert('회식을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.');
      return;
    }

    handleModalClose();
    await router.push('/settlement');
  };

  if (!router.isReady) return null;
  if (!isValidId) return <ErrorPage statusCode={404} />;
  if (isPending || !isFetchedAfterMount) return <Loader />;

  const firstRound = settlement?.rounds.find(({ roundNumber }) => roundNumber === 1);

  if (isError || !settlement || !firstRound) {
    return <ErrorPage statusCode={isAxiosError(error) && error.response?.status === 404 ? 404 : 500} />;
  }

  const initialValues: SettlementFormValues = {
    title: settlement.title,
    diningDate: dayjs(settlement.diningDate).format('YYYY.MM.DD'),
    joinableParts: settlement.joinableParts,
    files: settlement.imageUrl ? [settlement.imageUrl] : [],
    place: firstRound.place ?? '',
    naverMapLink: firstRound.naverMapLink ?? '',
    kakaoMapLink: firstRound.kakaoMapLink ?? '',
    startTime: firstRound.startTime ?? '',
  };

  return (
    <>
      <SettlementForm
        key={meetingId}
        mode='edit'
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onDelete={handleModalOpen}
        deleteDisabled={!settlement.isLeader || settlement.isEnded || settlement.rounds.some((round) => round.isClosed)}
        isDeleting={isDeleting}
      />
      <DeleteDialog
        target='settlement'
        open={isModalOpened}
        onOpenChange={handleModalClose}
        onConfirm={handleDelete}
        isPending={isDeleting}
      />
    </>
  );
};

export default EditSettlementPage;

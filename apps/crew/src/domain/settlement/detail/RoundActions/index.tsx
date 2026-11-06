import {
  useCloseSettlementRoundMutation,
  useDeleteSettlementMutation,
  useDeleteSettlementRoundMutation,
  useRequestRoundPayerMutation,
  useRoundAttendanceMutation,
} from '@api/settlement/mutation';
import SettlementQueryKey from '@api/settlement/SettlementQueryKey';
import type { GetSettlementDetail } from '@api/settlement/type';
import DeleteDialog from '@domain/settlement/DeleteDialog';
import { getSettlementRole } from '@domain/settlement/util';
import useModal from '@hook/useModal';
import { colors, spacing } from '@sopt-mds/design-tokens';
import { IconCheck } from '@sopt-mds/icons';
import { ActionButton, Dialog } from '@sopt-mds/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';
import type { RoundType } from '@/domain/settlement/types';

interface RoleActionsProps {
  meetingId: number;
  round: Pick<RoundType, 'roundId' | 'roundNumber' | 'isClosed' | 'myPayerStatus'>;
  isEnded: boolean;
  isMobile: boolean;
}

export const LeaderActions = ({
  meetingId,
  round: { roundId, roundNumber, isClosed },
  isEnded,
  isMobile,
  hasClosedRound,
}: RoleActionsProps & { hasClosedRound: boolean }) => {
  const {
    isModalOpened: isCloseModalOpened,
    handleModalOpen: handleCloseModalOpen,
    handleModalClose: handleCloseModalClose,
  } = useModal();
  const {
    isModalOpened: isDeleteModalOpened,
    handleModalOpen: handleDeleteModalOpen,
    handleModalClose: handleDeleteModalClose,
  } = useModal();
  const router = useRouter();
  const { mutateAsync: deleteSettlement, isPending: isDeletingSettlement } = useDeleteSettlementMutation();
  const { mutateAsync: deleteRound, isPending: isDeletingRound } = useDeleteSettlementRoundMutation();
  const { mutate: closeRound, isPending: isClosing } = useCloseSettlementRoundMutation(meetingId, roundId);
  const isPending = isDeletingSettlement || isDeletingRound || isClosing;

  const handleDelete = async () => {
    try {
      if (roundNumber === 1) {
        await deleteSettlement(meetingId);
      } else {
        await deleteRound({ meetingId, roundId });
      }
    } catch {
      // TODO: 디자인 확인 후 실패 안내 UX 수정
      alert(
        roundNumber === 1
          ? '회식을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.'
          : '회차를 삭제하지 못했어요. 잠시 후 다시 시도해주세요.',
      );
      return;
    }

    handleDeleteModalClose();

    if (roundNumber === 1) {
      await router.push('/settlement');
    }
  };

  const handleEdit = () => {
    if (roundNumber === 1) {
      router.push(`/settlement/edit?id=${meetingId}`);
      return;
    }
    router.push(`/settlement/round/edit?id=${meetingId}&roundId=${roundId}`);
  };

  return (
    <>
      <SButtonRow>
        <SActionButton
          size={isMobile ? 'medium' : 'large'}
          variant='secondary'
          disabled={isPending || isEnded || (roundNumber === 1 ? hasClosedRound : isClosed)}
          onClick={handleDeleteModalOpen}
        >
          삭제
        </SActionButton>
        <SActionButton
          size={isMobile ? 'medium' : 'large'}
          variant='primary'
          disabled={isEnded || isPending}
          onClick={handleEdit}
        >
          수정
        </SActionButton>
      </SButtonRow>
      <SActionButton
        size={isMobile ? 'medium' : 'large'}
        variant='primary'
        disabled={isClosed || isEnded || isPending}
        onClick={handleCloseModalOpen}
      >
        {isClosed ? '마감 완료' : '마감하기'}
      </SActionButton>

      <SCloseRoundDialog
        open={isCloseModalOpened}
        onOpenChange={handleCloseModalClose}
        device={isMobile ? 'mobile' : 'pc'}
      >
        <Dialog.Title>회차를 마감할까요?</Dialog.Title>
        <Dialog.Description>
          회차 마감 후에는 더이상 신청자를 받을 수 없고,
          <br />
          마감 이후 회차 삭제가 불가능해요.
        </Dialog.Description>
        <Dialog.Actions>
          <Dialog.Cancel>잠깐만요</Dialog.Cancel>
          <Dialog.Action onClick={() => closeRound()}>마감하기</Dialog.Action>
        </Dialog.Actions>
      </SCloseRoundDialog>
      <DeleteDialog
        target={roundNumber === 1 ? 'settlement' : 'round'}
        open={isDeleteModalOpened}
        onOpenChange={handleDeleteModalClose}
        onConfirm={handleDelete}
        isPending={isDeletingSettlement || isDeletingRound}
      />
    </>
  );
};

export const AttendeeActions = ({
  meetingId,
  round: { roundId, roundNumber, isClosed, myPayerStatus },
  isEnded,
  isMobile,
  isAttending,
  settlementRole,
  userId,
}: RoleActionsProps & { isAttending: boolean; settlementRole: string; userId?: number }) => {
  const queryClient = useQueryClient();
  const { mutate: updateAttendance, isPending: isUpdatingAttendance } = useRoundAttendanceMutation(meetingId, roundId);
  const { mutate: requestPayer, isPending: isRequestingPayer } = useRequestRoundPayerMutation(meetingId, roundId);
  const isPending = isUpdatingAttendance || isRequestingPayer;

  const handleAttendanceClick = () => {
    updateAttendance(isAttending, {
      onSuccess: (_, wasAttending) => {
        if (wasAttending) {
          const settlement = queryClient.getQueryData<GetSettlementDetail['response']>(
            SettlementQueryKey.detail(meetingId),
          );
          ampli.completeCancelSettlementRound({
            group_id: meetingId,
            settlement_role: settlement ? getSettlementRole(settlement) : undefined,
            settlement_round_id: roundId,
            settlement_round_no: roundNumber,
            user_id: userId,
          });
          return;
        }

        ampli.completeRegisterSettlementRound({
          group_id: meetingId,
          settlement_role: settlementRole === 'co_payer' ? 'co_payer' : 'attendee',
          settlement_round_id: roundId,
          settlement_round_no: roundNumber,
          user_id: userId,
        });
      },
    });
  };

  return (
    <>
      <SActionButton
        size={isMobile ? 'medium' : 'large'}
        variant={isAttending ? 'secondary' : 'primary'}
        disabled={isClosed || isEnded || isPending}
        onClick={handleAttendanceClick}
      >
        {isClosed && '마감'}
        {!isClosed && (isAttending ? '참석취소' : '참석하기')}
      </SActionButton>
      <SPayerButton
        size={isMobile ? 'medium' : 'large'}
        variant={myPayerStatus ? 'secondary' : 'primary'}
        disabled={!isAttending || !!myPayerStatus || isPending}
        hasPayerStatus={!!myPayerStatus}
        leftAddon={myPayerStatus === 'APPROVED' ? <IconCheck aria-hidden /> : undefined}
        onClick={() => requestPayer()}
      >
        {myPayerStatus === 'APPROVED' && '결제자 승인 완료'}
        {myPayerStatus === 'PENDING' && '결제자 승인 대기 중'}
        {!myPayerStatus && '제가 결제했어요'}
      </SPayerButton>
    </>
  );
};

const SCloseRoundDialog = styled(Dialog, {
  'top': spacing.s120,
  'bottom': 'auto',
  '@mobile': {
    top: '0px',
    bottom: '0px',
  },
});
const SButtonRow = styled('div', {
  display: 'flex',
  gap: spacing.s8,
});
const SActionButton = styled(ActionButton, {
  '&&': {
    width: '100%',
  },
});
const SPayerButton = styled(SActionButton, {
  '&&': {
    marginTop: spacing.s16,
  },
  '@mobile': {
    '&&': {
      gridColumn: '1 / -1',
      marginTop: '0px',
    },
  },
  'variants': {
    hasPayerStatus: {
      true: {
        '&&:disabled': {
          backgroundColor: colors.bg.neutral.subtle,
          color: colors.fg.neutral.bold,
        },
      },
    },
  },
});

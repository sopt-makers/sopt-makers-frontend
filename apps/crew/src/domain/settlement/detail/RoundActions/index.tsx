import useModal from '@hook/useModal';
import { colors, spacing } from '@sopt-mds/design-tokens';
import { IconCheck } from '@sopt-mds/icons';
import { ActionButton, Dialog } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

import type { RoundType } from '@/domain/settlement/types';

interface RoleActionsProps {
  round: Pick<RoundType, 'roundNumber' | 'isClosed' | 'myPayerStatus'>;
  isEnded: boolean;
  isMobile: boolean;
}

export const LeaderActions = ({
  round: { roundNumber, isClosed },
  isEnded,
  isMobile,
  hasClosedRound,
}: RoleActionsProps & { hasClosedRound: boolean }) => {
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <SButtonRow>
        <SActionButton
          size={isMobile ? 'medium' : 'large'}
          variant='secondary'
          disabled={isEnded || (roundNumber === 1 ? hasClosedRound : isClosed)}
          onClick={() => {
            // @TODO: 회식 또는 회차 삭제 연결 (장정훈)
          }}
        >
          삭제
        </SActionButton>
        <SActionButton
          size={isMobile ? 'medium' : 'large'}
          variant='primary'
          disabled={isEnded}
          onClick={() => {
            // @TODO: 회식 또는 회차 수정 연결 (장정훈)
          }}
        >
          수정
        </SActionButton>
      </SButtonRow>
      <SActionButton
        size={isMobile ? 'medium' : 'large'}
        variant='primary'
        disabled={isClosed || isEnded}
        onClick={handleModalOpen}
      >
        {isClosed ? '마감 완료' : '마감하기'}
      </SActionButton>

      <SCloseRoundDialog open={isModalOpened} onOpenChange={handleModalClose} device={isMobile ? 'mobile' : 'pc'}>
        <Dialog.Title>회차를 마감할까요?</Dialog.Title>
        <Dialog.Description>
          회차 마감 후에는 더이상 신청자를 받을 수 없고,
          <br />
          마감 이후 회차 삭제가 불가능해요.
        </Dialog.Description>
        <Dialog.Actions>
          <Dialog.Cancel>잠깐만요</Dialog.Cancel>
          <Dialog.Action
            onClick={() => {
              // @TODO: 회차 마감 API 연동 (장정훈)
            }}
          >
            마감하기
          </Dialog.Action>
        </Dialog.Actions>
      </SCloseRoundDialog>
    </>
  );
};

export const AttendeeActions = ({
  round: { isClosed, myPayerStatus },
  isEnded,
  isMobile,
  isAttending,
}: RoleActionsProps & { isAttending: boolean }) => (
  <>
    <SActionButton
      size={isMobile ? 'medium' : 'large'}
      variant={isAttending ? 'secondary' : 'primary'}
      disabled={isClosed || isEnded}
      onClick={() => {
        // @TODO: 회차 참석 및 취소 연결 (장정훈)
      }}
    >
      {isClosed && '마감'}
      {!isClosed && (isAttending ? '참석취소' : '참석하기')}
    </SActionButton>
    <SPayerButton
      size={isMobile ? 'medium' : 'large'}
      variant={myPayerStatus ? 'secondary' : 'primary'}
      disabled={!isAttending || !!myPayerStatus}
      hasPayerStatus={!!myPayerStatus}
      leftAddon={myPayerStatus === 'APPROVED' ? <IconCheck aria-hidden /> : undefined}
      onClick={() => {
        // @TODO: 결제자 요청 연결 (장정훈)
      }}
    >
      {myPayerStatus === 'APPROVED' && '결제자 승인 완료'}
      {myPayerStatus === 'PENDING' && '결제자 승인 대기 중'}
      {!myPayerStatus && '제가 결제했어요'}
    </SPayerButton>
  </>
);

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

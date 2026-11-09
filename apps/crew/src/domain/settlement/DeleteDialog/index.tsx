import { useDisplay } from '@hook/useDisplay';
import { spacing } from '@sopt-mds/design-tokens';
import { Dialog } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface DeleteDialogProps {
  target: 'settlement' | 'round';
  open: boolean;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteDialog = ({ target, open, isPending, onOpenChange, onConfirm }: DeleteDialogProps) => {
  const { isMobile } = useDisplay();

  return (
    <SDialog
      open={open}
      onOpenChange={onOpenChange}
      device={isMobile ? 'mobile' : 'pc'}
      onCancel={(event) => {
        if (isPending) event.preventDefault();
      }}
    >
      <Dialog.Title ref={(title) => title?.setAttribute('autofocus', '')} tabIndex={-1}>
        {target === 'settlement' ? '회식을 삭제할까요?' : '회차를 삭제할까요?'}
      </Dialog.Title>
      <Dialog.Description>
        {target === 'settlement'
          ? '회식을 삭제하면 모든 회차와 참석 기록이 삭제돼요.'
          : '해당 회차와 참석 기록이 삭제돼요.'}
        {isMobile ? ' ' : <br />}
        삭제된 기록은 더 이상 확인할 수 없어요.
      </Dialog.Description>
      <SActions>
        <Dialog.Cancel ref={(button) => button?.removeAttribute('autofocus')} type='button' disabled={isPending}>
          잠깐만요
        </Dialog.Cancel>
        <Dialog.Action
          type='button'
          disabled={isPending}
          onClick={(event) => {
            event.preventDefault();
            onConfirm();
          }}
        >
          삭제하기
        </Dialog.Action>
      </SActions>
    </SDialog>
  );
};

export default DeleteDialog;

const SDialog = styled(Dialog, {
  'position': 'fixed',
  'top': spacing.s120,
  'right': 0,
  'bottom': 'auto',
  'left': 0,
  'margin': '0 auto',
  '& h2:focus': { outline: 'none' },
  '@mobile': {
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
});

const SActions = styled(Dialog.Actions, { '&&': { gap: 9 } });

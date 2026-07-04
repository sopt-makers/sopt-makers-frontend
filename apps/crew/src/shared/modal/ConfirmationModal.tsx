import { Dialog } from '@headlessui/react';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import type { ReactNode } from 'react';
import { styled } from 'stitches.config';

import ModalContainer from './ModalContainer';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: ReactNode;
  cancelLabel: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
}

// @TODO: MDS 2.0 모달 컴포넌트로 변경시 코드 삭제
const ConfirmationModal = ({
  isOpen,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onClose,
  onConfirm,
  isPending = false,
}: ConfirmationModalProps) => {
  return (
    <ModalContainer isModalOpened={isOpen} handleModalClose={onClose} isSubmitting={isPending}>
      <SModal>
        <SContent>
          <STitle>{title}</STitle>
          <SDescription>{description}</SDescription>
        </SContent>

        <SActions>
          <ActionButton type='button' size='large' variant='secondary' disabled={isPending} onClick={onClose}>
            {cancelLabel}
          </ActionButton>
          <ActionButton type='button' size='large' variant='primary' disabled={isPending} onClick={onConfirm}>
            {confirmLabel}
          </ActionButton>
        </SActions>
      </SModal>
    </ModalContainer>
  );
};

export default ConfirmationModal;

const SModal = styled('div', {
  'position': 'fixed',
  'top': spacing.s120,
  'left': '50%',
  'zIndex': '$2',
  'display': 'flex',
  'width': '400px',
  'padding': spacing.s24,
  'transform': 'translateX(-50%)',
  'flexDirection': 'column',
  'gap': spacing.s20,
  'borderRadius': radius.r14,
  'backgroundColor': colors.bg.neutral.ghost,

  '@mobile': {
    top: '50%',
    padding: spacing.s20,
    width: '303px',
    transform: 'translate(-50%, -50%)',
  },
});

const SContent = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s12,

  '@mobile': {
    gap: spacing.s8,
  },
});

const STitle = styled(Dialog.Title, {
  color: colors.fg.neutral.bold,
  ...typography.heading3,
});

const SDescription = styled(Dialog.Description, {
  'color': colors.fg.neutral.default,
  'whiteSpace': 'pre-line',
  ...typography.body1,

  '@mobile': {
    ...typography.body2,
  },
});

const SActions = styled('div', {
  'display': 'grid',
  'gridTemplateColumns': 'repeat(2, minmax(0, 1fr))',
  'gap': '9px',

  '& button': {
    width: '100%',
  },
});

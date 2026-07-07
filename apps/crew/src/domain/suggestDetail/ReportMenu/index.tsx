import { Menu } from '@headlessui/react';
import { useOverlay } from '@hook/useOverlay/Index';
import ConfirmModal from '@shared/modal/ConfirmModal';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconAlertTriangleOutlined, IconDotsVertical } from '@sopt-mds/icons';
import { styled } from 'stitches.config';

interface ReportMenuProps {
  reportMessage: string;
  onConfirmReport: () => void;
}

const ReportMenu = ({ reportMessage, onConfirmReport }: ReportMenuProps) => {
  const overlay = useOverlay();

  const handleClickReport = () => {
    overlay.open(({ isOpen, close }) => (
      <ConfirmModal
        isModalOpened={isOpen}
        message={reportMessage}
        cancelButton='돌아가기'
        confirmButton='신고하기'
        handleModalClose={close}
        handleConfirm={() => {
          onConfirmReport();
          close();
        }}
      />
    ));
  };

  return (
    <Menu as='div' style={{ position: 'relative' }}>
      <SMenuButton aria-label='더보기'>
        <IconDotsVertical width={20} height={20} />
      </SMenuButton>
      <SMenuItems>
        <Menu.Item>
          <SMenuItemButton type='button' onClick={handleClickReport}>
            <IconAlertTriangleOutlined width={16} height={16} />
            신고
          </SMenuItemButton>
        </Menu.Item>
      </SMenuItems>
    </Menu>
  );
};

export default ReportMenu;

const SMenuButton = styled(Menu.Button, {
  display: 'flex',
  padding: spacing.s4,
  color: colors.fg.neutral.subtle,
});

const SMenuItems = styled(Menu.Items, {
  position: 'absolute',
  top: '100%',
  right: 0,
  zIndex: 10,
  padding: spacing.s8,
  borderRadius: radius.r12,
  backgroundColor: colors.bg.neutral.ghost,
});

const SMenuItemButton = styled('button', {
  'display': 'flex',
  'width': '100%',
  'alignItems': 'center',
  'gap': spacing.s4,
  'padding': `${spacing.s8} ${spacing.s12}`,
  'whiteSpace': 'nowrap',
  'textAlign': 'left',
  'color': colors.fg.neutral.bold,
  'borderRadius': radius.r8,
  ...typography.label3,

  '&:hover': {
    backgroundColor: colors.bg.neutral.subtle,
  },
});

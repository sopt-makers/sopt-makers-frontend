import { Dialog } from '@headlessui/react';
import { useDisplay } from '@hook/useDisplay';
import ModalContainer from '@shared/modal/ModalContainer';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight, IconXClose } from '@sopt-mds/icons';
import { Avatar } from '@sopt-mds/ui';
import Link from 'next/link';
import { styled } from 'stitches.config';

import { attendanceMocks } from './mock';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingId: number;
  roundNumber: number;
  isLeader: boolean;
}

const AttendanceModal = ({ isOpen, onClose, meetingId, roundNumber, isLeader }: AttendanceModalProps) => {
  const { isMobile } = useDisplay();

  return (
    <ModalContainer isModalOpened={isOpen} handleModalClose={onClose}>
      <SModal>
        <SHeader>
          <Dialog.Title>{roundNumber}차 참석 현황</Dialog.Title>
          <SCloseButton type='button' onClick={onClose} aria-label='닫기'>
            <IconXClose width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} aria-hidden />
          </SCloseButton>
        </SHeader>

        <SList>
          {attendanceMocks.attendees.map((attendee, index) => (
            <SItem key={attendee.id}>
              <SNumber>{index + 1}</SNumber>
              <Avatar size={isMobile ? 24 : 32} type='subtle' src={attendee.profileImage || undefined} aria-hidden />
              <SName>{attendee.name}</SName>
            </SItem>
          ))}
        </SList>

        <SFooter>
          <span>총 {attendanceMocks.attendees.length}명 참석</span>
          {isLeader && (
            <SManagementLink href={`/settlement/management?id=${meetingId}`}>
              참석자 관리 <IconChevronRight width={16} height={16} aria-hidden />
            </SManagementLink>
          )}
        </SFooter>
      </SModal>
    </ModalContainer>
  );
};

export default AttendanceModal;

const SModal = styled('div', {
  'position': 'fixed',
  'top': '50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)',
  'zIndex': '$2',
  'width': 'min(646px, calc(100% - 40px))',
  'maxHeight': 'calc(100dvh - 40px)',
  'display': 'flex',
  'flexDirection': 'column',
  'borderRadius': radius.r20,
  'backgroundColor': colors.base.gray800,
  '@mobile': {
    width: 'min(280px, calc(100% - 40px))',
  },
});

const SHeader = styled('div', {
  ...typography.heading2,
  'display': 'flex',
  'alignItems': 'center',
  'padding': `${spacing.s32} ${spacing.s40}`,
  'borderBottom': `1px solid ${colors.stroke.neutral.subtle}`,
  'color': colors.fg.neutral.bold,
  '& h2': {
    flex: 1,
    textAlign: 'center',
  },
  '@mobile': {
    ...typography.title5,
    padding: `${spacing.s20} ${spacing.s24}`,
    borderBottom: 'none',
  },
});

const SCloseButton = styled('button', {
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.fg.neutral.bold,
  cursor: 'pointer',
});

const SList = styled('ol', {
  'display': 'grid',
  'gridTemplateColumns': 'repeat(2, minmax(0, 1fr))',
  'gap': spacing.s12,
  'minHeight': '0px',
  'maxHeight': '216px',
  'overflowY': 'auto',
  'margin': `${spacing.s24} ${spacing.s24} 0`,
  'paddingRight': spacing.s10,
  'scrollbarWidth': 'thin',
  'scrollbarColor': `${colors.fg.neutral.ghost} transparent`,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: colors.fg.neutral.ghost,
    borderRadius: radius.r6,
  },
  '@mobile': {
    'gridTemplateColumns': 'minmax(0, 1fr)',
    'gap': spacing.s8,
    'maxHeight': '328px',
    'margin': `0 ${spacing.s10} 0 ${spacing.s20}`,
    'paddingRight': spacing.s6,
    '&::-webkit-scrollbar': {
      width: '4px',
    },
  },
});

const SItem = styled('li', {
  ...typography.label2,
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s10,
  'minWidth': '0px',
  'height': '64px',
  'padding': `${spacing.s16} ${spacing.s20}`,
  'borderRadius': radius.r12,
  'backgroundColor': colors.bg.neutral.subtle,
  'color': colors.fg.neutral.bold,
  '@mobile': {
    ...typography.body2,
    height: '48px',
    padding: `${spacing.s10} ${spacing.s12}`,
  },
});

const SNumber = styled('span', {
  width: '30px',
  flexShrink: 0,
  color: colors.fg.neutral.default,
  textAlign: 'center',
});

const SName = styled('span', {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const SFooter = styled('div', {
  ...typography.label2,
  'display': 'flex',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'padding': `19px 42px 39px 30px`,
  'color': colors.fg.neutral.ghost,
  '@mobile': {
    ...typography.label4,
    padding: `18px ${spacing.s20} 22px`,
    color: colors.base.gray400,
  },
});

const SManagementLink = styled(Link, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.s4,
  color: colors.fg.neutral.bold,
});

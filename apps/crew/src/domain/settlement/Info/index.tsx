import { useEndSettlementMutation } from '@api/settlement/mutation';
import { PART_NAME } from '@constant/option';
import { useDisplay } from '@hook/useDisplay';
import useModal from '@hook/useModal';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton, Avatar, Dialog, Tag } from '@sopt-mds/ui';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

import { SETTLEMENT_STATUS_LABELS } from '../constant';
import type { SettlementDetail } from '../types';

interface InfoProps {
  settlement: Pick<
    SettlementDetail,
    'meetingId' | 'title' | 'diningDate' | 'imageUrl' | 'isEnded' | 'joinableParts' | 'leader' | 'isLeader'
  >;
}

const Info = ({
  settlement: { meetingId, title, diningDate, imageUrl, isEnded, joinableParts, leader, isLeader },
}: InfoProps) => {
  const { isMobile } = useDisplay();
  const router = useRouter();
  const { mutate: endSettlement, isPending } = useEndSettlementMutation(meetingId);
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();

  return (
    <SInfo>
      <SImage src={imageUrl || '/group/assets/images/settlement/thumbnail.svg'} alt={imageUrl ? '' : '회식 이미지'} />
      <SContent>
        <SDetails>
          <STags>
            <Tag
              size={isMobile ? 'small' : 'medium'}
              shape='rect'
              variant={isEnded ? 'default' : 'primary'}
              type='solid'
            >
              {SETTLEMENT_STATUS_LABELS[isEnded ? 'ended' : 'ongoing']}
            </Tag>

            {joinableParts?.map((part) => (
              <Tag key={part} size={isMobile ? 'small' : 'medium'} shape='rect' variant='default' type='solid'>
                {PART_NAME[part]}
              </Tag>
            ))}
          </STags>

          <STitle>
            <SDate>[{dayjs(diningDate).format('YY.MM.DD')}]</SDate>
            {title}
          </STitle>

          <SProfile>
            <Avatar size={isMobile ? 24 : 48} src={leader.profileImage || undefined} />
            <span>{leader.name}</span>
          </SProfile>
        </SDetails>

        {isLeader && (
          <SActions>
            <SActionButton
              size={isMobile ? 'medium' : 'large'}
              variant='primary'
              disabled={isEnded || isPending}
              onClick={handleModalOpen}
            >
              회식 종료하기
            </SActionButton>
            <SActionButton
              size={isMobile ? 'medium' : 'large'}
              variant='secondary'
              disabled={isEnded || isPending}
              onClick={() => {
                router.push(`/settlement/round/create?id=${meetingId}`);
              }}
            >
              + 회차 추가하기
            </SActionButton>
          </SActions>
        )}
      </SContent>

      <SEndSettlementDialog open={isModalOpened} onOpenChange={handleModalClose} device={isMobile ? 'mobile' : 'pc'}>
        <Dialog.Title>회식을 종료할까요?</Dialog.Title>
        <Dialog.Description>
          회식 종료 시 모든 회차가 마감되며 신청자를 받을 수 없어요. 종료된 회식은 삭제가 불가능해요.
        </Dialog.Description>
        <Dialog.Actions>
          <Dialog.Cancel>잠깐만요</Dialog.Cancel>
          <Dialog.Action onClick={() => endSettlement()}>종료하기</Dialog.Action>
        </Dialog.Actions>
      </SEndSettlementDialog>
    </SInfo>
  );
};

export default Info;

const SInfo = styled('section', {
  'maxWidth': '1020px',
  'marginInline': 'auto',
  'borderBottom': `1px solid ${colors.stroke.neutral.ghost}`,
  '@desktop': { maxWidth: '708px' },
  '@mobile': {
    maxWidth: 'none',
    width: `calc(100% + ${spacing.s40})`,
    marginLeft: '-20px',
  },
});

const SImage = styled('img', {
  'display': 'block',
  'width': '100%',
  'height': '594px',
  'objectFit': 'cover',
  'borderRadius': radius.r12,
  '@mobile': {
    height: '256px',
    borderRadius: radius.r0,
  },
});

const SContent = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'gap': spacing.s12,
  'paddingTop': spacing.s80,
  'paddingBottom': spacing.s40,
  '@desktop': {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  '@mobile': {
    padding: `${spacing.s24} ${spacing.s16} ${spacing.s40}`,
  },
});

const SDetails = styled('div', {
  minWidth: 0,
});

const SActions = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'flexShrink': 0,
  'gap': spacing.s12,
  'width': '300px',
  '@desktop': {
    flexDirection: 'row',
    width: '100%',
  },
  '@mobile': {
    gap: spacing.s8,
  },
});

const SActionButton = styled(ActionButton, {
  '&&': {
    flex: 1,
    width: '100%',
  },
});

const STags = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.s8,
});

const STitle = styled('h1', {
  ...typography.heading1,
  'marginTop': spacing.s12,
  'color': colors.fg.neutral.bold,
  'overflowWrap': 'anywhere',
  '@mobile': {
    ...typography.label1,
    marginTop: spacing.s10,
  },
});

const SDate = styled('span', {
  'color': colors.fg.neutral.subtle,
  'marginRight': spacing.s8,
  'whiteSpace': 'nowrap',
  '@mobile': {
    marginRight: spacing.s4,
  },
});

const SProfile = styled('div', {
  ...typography.title2,
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s14,
  'marginTop': spacing.s12,
  'padding': `${spacing.s12} ${spacing.s16}`,
  '@mobile': {
    ...typography.label3,
    width: 'fit-content',
    gap: spacing.s6,
    padding: `5px ${spacing.s8}`,
    marginTop: spacing.s16,
    borderRadius: radius.r6,
    backgroundColor: colors.base.gray900,
  },
});

const SEndSettlementDialog = styled(Dialog, {
  'top': spacing.s120,
  'bottom': 'auto',
  '@mobile': {
    top: '0px',
    bottom: '0px',
  },
});

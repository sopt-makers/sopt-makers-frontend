import type { SettlementCardItem } from '@api/settlement/type';
import { PART_NAME } from '@constant/option';
import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight, IconUsersFilled } from '@sopt-mds/icons';
import { Avatar, ReactionButton, Tag } from '@sopt-mds/ui';
import dayjs from '@util/dayjs';
import { styled } from 'stitches.config';

import { SETTLEMENT_STATUS_LABELS } from '../constant';

interface SettlementCardProps {
  item: SettlementCardItem;
  showManagementButton?: boolean;
}

const DEFAULT_THUMBNAIL_SRC = '/group/assets/images/settlement/thumbnail.svg';

const SettlementCard = ({ item, showManagementButton = false }: SettlementCardProps) => {
  const { isMobile } = useDisplay();
  const dateLabel = dayjs(item.diningDate).format('YY.MM.DD');
  const { attendeeCount, leader } = item;
  const participantName = attendeeCount > 1 ? `${leader.name} 외 ${attendeeCount - 1}명` : `${leader.name}님`;

  return (
    <SCard>
      <SThumbnail>
        <SThumbnailImage
          src={item.imageUrl || DEFAULT_THUMBNAIL_SRC}
          alt={item.imageUrl ? '' : '회식 기본 이미지'}
          width={380}
          height={260}
          loading='lazy'
        />
        <SStatusBadge
          size={isMobile ? 'small' : 'medium'}
          shape='rect'
          variant={item.isEnded ? 'default' : 'primary'}
          type='solid'
        >
          {item.isEnded ? SETTLEMENT_STATUS_LABELS.ended : SETTLEMENT_STATUS_LABELS.ongoing}
        </SStatusBadge>
        <SParticipantBadge
          size='medium'
          shape='rect'
          variant='default'
          type='solid'
          leftAddon={<IconUsersFilled width={14} height={14} aria-hidden />}
          aria-label={`참여자 ${attendeeCount}명`}
        >
          {attendeeCount}명
        </SParticipantBadge>
      </SThumbnail>
      <SInfo hasManagementButton={showManagementButton}>
        <SParts aria-label='참여 파트'>
          {item.joinableParts.map((part) => (
            <Tag key={part} size='small' shape='rect' variant='default' type='solid'>
              {PART_NAME[part]}
            </Tag>
          ))}
        </SParts>
        <div>
          <STitle hasManagementButton={showManagementButton}>
            <SDateLabel>[{dateLabel}]</SDateLabel>
            <STitleText title={item.title}>{item.title}</STitleText>
          </STitle>
          <SParticipants hasManagementButton={showManagementButton}>
            <Avatar size={24} src={leader.profileImage || undefined} strokeColor='neutralGhost' aria-hidden />
            <SParticipantLabel>{participantName}이 참여 중</SParticipantLabel>
          </SParticipants>
        </div>
        {showManagementButton && (
          <SManagementButton size={isMobile ? 'xsmall' : 'medium'} rightAddon={<IconChevronRight aria-hidden />}>
            참석자 관리
          </SManagementButton>
        )}
      </SInfo>
    </SCard>
  );
};

export default SettlementCard;

const SCard = styled('article', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s16,
  'minWidth': 0,
  '@mobile': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
    padding: `${spacing.s16} 0`,
    borderBottom: `1px solid ${colors.stroke.neutral.ghost}`,
  },
});

const SThumbnail = styled('div', {
  'position': 'relative',
  'aspectRatio': '380 / 260',
  'overflow': 'hidden',
  'borderRadius': radius.r12,
  'backgroundColor': colors.bg.neutral.ghost,
  '@mobile': { width: 143, height: 98, flexShrink: 0 },
});

const SThumbnailImage = styled('img', {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const SStatusBadge = styled(Tag, {
  'position': 'absolute',
  'top': spacing.s16,
  'left': spacing.s16,
  '@mobile': { top: spacing.s10, left: spacing.s10 },
});

const SParticipantBadge = styled(Tag, {
  'position': 'absolute',
  'top': spacing.s16,
  'right': spacing.s16,
  '@mobile': { '&&': { display: 'none' } },
});

const SInfo = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s16,
  'minWidth': 0,
  '@mobile': { flex: 1, gap: spacing.s12 },
  'variants': {
    hasManagementButton: {
      true: {
        '@mobile': { gap: spacing.s8 },
      },
    },
  },
});

const SParts = styled('div', {
  'display': 'flex',
  'flexWrap': 'wrap',
  'gap': spacing.s6,
  '@mobile': { order: 1 },
});

const STitle = styled('h2', {
  ...typography.title3,
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'color': colors.fg.neutral.bold,
  '@mobile': { ...typography.title4, gap: spacing.s4 },
  'variants': {
    hasManagementButton: {
      true: {
        '@mobile': { ...typography.title5 },
      },
    },
  },
});

const SDateLabel = styled('span', {
  flexShrink: 0,
  color: colors.fg.neutral.subtle,
});

const STitleText = styled('span', {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const SParticipants = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'marginTop': spacing.s8,
  '@mobile': { marginTop: spacing.s4, gap: spacing.s4 },
  'variants': {
    hasManagementButton: {
      true: {
        '@mobile': { marginTop: spacing.s2 },
      },
    },
  },
});

const SParticipantLabel = styled('p', {
  ...typography.label3,
  'minWidth': 0,
  'color': colors.fg.neutral.default,
  'overflowWrap': 'anywhere',
  '@mobile': {
    ...typography.label4,
    flex: 1,
    color: colors.fg.neutral.subtle,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const SManagementButton = styled(ReactionButton, {
  'alignSelf': 'flex-start',
  '@mobile': { order: 2 },
});

import { PART_NAME } from '@constant/option';
import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconUsersFilled } from '@sopt-mds/icons';
import { Avatar, Tag } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

import type { SettlementCardItem } from '../types';
import { SETTLEMENT_STATUS_LABELS } from '../types';

interface SettlementCardProps {
  item: SettlementCardItem;
}

const DEFAULT_THUMBNAIL_SRC = '/group/assets/images/settlement/thumbnail.svg';

const SettlementCard = ({ item }: SettlementCardProps) => {
  const { isMobile } = useDisplay();

  return (
    <SCard>
      <SThumbnail>
        <SThumbnailImage
          src={item.thumbnailSrc || DEFAULT_THUMBNAIL_SRC}
          alt={item.thumbnailSrc ? '' : '회식 기본 이미지'}
          width={380}
          height={260}
          loading='lazy'
        />
        <SStatusBadge
          size={isMobile ? 'small' : 'medium'}
          shape='rect'
          variant={item.status === 'ongoing' ? 'primary' : 'default'}
          type='solid'
        >
          {SETTLEMENT_STATUS_LABELS[item.status]}
        </SStatusBadge>
        <SParticipantBadge
          size='medium'
          shape='rect'
          variant='default'
          type='solid'
          leftAddon={<IconUsersFilled width={14} height={14} aria-hidden />}
          aria-label={`참여자 ${item.participantCount}명`}
        >
          {item.participantCount}명
        </SParticipantBadge>
      </SThumbnail>
      <SInfo>
        <SParts aria-label='참여 파트'>
          {item.parts.map((part) => (
            <Tag key={part} size='small' shape='rect' variant='default' type='solid'>
              {PART_NAME[part]}
            </Tag>
          ))}
        </SParts>
        <div>
          <STitle>
            <SDateLabel>{item.dateLabel}</SDateLabel>
            <STitleText title={item.title}>{item.title}</STitleText>
          </STitle>
          <SParticipants>
            <Avatar size={24} src={item.avatarSrc || undefined} strokeColor='neutralGhost' aria-hidden />
            <SParticipantLabel>{item.participantLabel}</SParticipantLabel>
          </SParticipants>
        </div>
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

import type { SettlementCardItem, SettlementListTab } from '@api/settlement/type';
import { PART_NAME } from '@constant/option';
import { useDisplay } from '@hook/useDisplay';
import { Divider } from '@shared/util/Divider';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight, IconUsersFilled } from '@sopt-mds/icons';
import { Avatar, ReactionButton, Tag } from '@sopt-mds/ui';
import dayjs from '@util/dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

import { SETTLEMENT_STATUS_LABELS } from '../constant';

interface SettlementCardProps {
  item: SettlementCardItem;
  tab: SettlementListTab;
  userId?: number;
  showManagementButton?: boolean;
}

const DEFAULT_THUMBNAIL_SRC = '/group/assets/images/settlement/thumbnail.svg';

const SettlementCard = ({ item, tab, userId, showManagementButton = false }: SettlementCardProps) => {
  const { isMobile } = useDisplay();
  const router = useRouter();
  const dateLabel = dayjs(item.diningDate).format('YY.MM.DD');
  const { attendeeCount, leader } = item;

  const handleCardClick = () => {
    ampli.clickSettlementCard({
      group_id: item.meetingId,
      settlement_list_tab: tab === 'ALL' ? 'all' : 'mine',
      settlement_status: item.isEnded ? SETTLEMENT_STATUS_LABELS.ended : SETTLEMENT_STATUS_LABELS.ongoing,
      user_id: userId,
    });
  };

  return (
    <SCard>
      <SThumbnail href={`/settlement/detail?id=${item.meetingId}`} tabIndex={-1} aria-hidden onClick={handleCardClick}>
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
      <SInfo>
        <SDetailLink href={`/settlement/detail?id=${item.meetingId}`} onClick={handleCardClick}>
          <SParts aria-label='참여 파트'>
            {item.joinableParts.map((part) => (
              <Tag key={part} size='small' shape='rect' variant='default' type='solid'>
                {PART_NAME[part]}
              </Tag>
            ))}
          </SParts>
          <div>
            <STitle>
              <SDateLabel>[{dateLabel}]</SDateLabel>
              <STitleText title={item.title}>{item.title}</STitleText>
            </STitle>
            <SOrganizer>
              <Avatar size={24} src={leader.profileImage || undefined} strokeColor='neutralGhost' aria-hidden />
              <SOrganizerName>{leader.name}</SOrganizerName>
              {isMobile && (
                <>
                  <SAttendeeDivider />
                  <SAttendeeCount>{attendeeCount}명이 참여 중</SAttendeeCount>
                </>
              )}
            </SOrganizer>
          </div>
        </SDetailLink>
        {showManagementButton && (
          <SManagementButton
            size={isMobile ? 'xsmall' : 'medium'}
            rightAddon={<IconChevronRight aria-hidden />}
            onClick={() => void router.push(`/settlement/management?id=${item.meetingId}`)}
          >
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
    gap: '17px',
    padding: `${spacing.s16} 0`,
    borderBottom: `1px solid ${colors.stroke.neutral.ghost}`,
  },
});

const SThumbnail = styled(Link, {
  'position': 'relative',
  'aspectRatio': '380 / 260',
  'overflow': 'hidden',
  'borderRadius': radius.r12,
  'backgroundColor': colors.bg.neutral.ghost,
  '@mobile': {
    width: '143px',
    height: '98px',
    flexShrink: 0,
  },
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
  '@mobile': {
    flex: 1,
    gap: spacing.s8,
  },
});

const SDetailLink = styled(Link, {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s16,
  'minWidth': '0px',
  '@mobile': {
    gap: spacing.s8,
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
  '@mobile': {
    ...typography.title5,
    gap: spacing.s4,
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

const SOrganizer = styled('div', {
  ...typography.label3,
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'marginTop': spacing.s8,
  'color': colors.fg.neutral.default,
  '@mobile': {
    ...typography.label4,
    marginTop: spacing.s2,
    gap: spacing.s4,
    color: colors.fg.neutral.subtle,
  },
});

const SOrganizerName = styled('span', {
  'overflowWrap': 'anywhere',
  '@mobile': {
    flex: '1 1 0',
    minWidth: '2em',
    maxWidth: 'max-content',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const SAttendeeDivider = styled(Divider, {
  width: 1,
  height: spacing.s10,
  flexShrink: 0,
  backgroundColor: colors.fg.neutral.ghostDisabled,
});

const SAttendeeCount = styled('span', {
  wordBreak: 'keep-all',
  overflowWrap: 'anywhere',
});

const SManagementButton = styled(ReactionButton, {
  'alignSelf': 'flex-start',
  '@mobile': { order: 2 },
});

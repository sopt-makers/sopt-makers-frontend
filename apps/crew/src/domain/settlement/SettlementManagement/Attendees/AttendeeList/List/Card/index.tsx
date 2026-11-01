import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton, Avatar, Tag } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

import type { Attendee } from '../../types';

interface CardProps extends Attendee {
  onDelete: (attendeeUserId: number) => void;
  isDeleting: boolean;
}

const Card = ({
  id,
  onDelete,
  isDeleting,
  attendanceNumber,
  profileImage,
  name,
  recentGeneration,
  phone,
}: CardProps) => {
  const displayName = Array.from(name).length > 5 ? `${Array.from(name).slice(0, 5).join('')}…` : name;

  return (
    <SCard>
      <SInfo>
        <SNumber>{attendanceNumber}</SNumber>
        <SProfile>
          <Avatar size={24} src={profileImage || undefined} strokeColor='neutralGhost' aria-hidden />
          <SName title={name} aria-label={name}>
            {displayName}
          </SName>
        </SProfile>
        <SDetails>
          <SGeneration>
            <Tag size='small' shape='rect' variant='default' type='solid'>
              {recentGeneration}기
            </Tag>
          </SGeneration>
          <SPhone>{phone}</SPhone>
        </SDetails>
      </SInfo>

      <SDeleteButton size='xsmall' variant='secondary' disabled={isDeleting} onClick={() => onDelete(id)}>
        삭제
      </SDeleteButton>
    </SCard>
  );
};

export default Card;

const SCard = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'minWidth': 0,
  'padding': `${spacing.s20} ${spacing.s24}`,
  'borderRadius': '20px',
  'backgroundColor': colors.bg.neutral.ghost,
  '@mobile': {
    padding: `${spacing.s16} ${spacing.s0}`,
    borderRadius: 0,
    borderBottom: `1px solid ${colors.stroke.neutral.subtle}`,
    backgroundColor: 'transparent',
  },
});

const SInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
});

const SDetails = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'flexShrink': 0,
  'gap': '30px',
  '@mobile': {
    gap: spacing.s0,
  },
});

const SNumber = styled('span', {
  ...typography.label2,
  'width': '60px',
  'flexShrink': 0,
  'textAlign': 'center',
  'color': colors.fg.neutral.bold,
  '@mobile': {
    display: 'none',
  },
});

const SProfile = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s10,
  'width': '164px',
  'flexShrink': 0,
  'minWidth': 0,
  'marginLeft': '1px',
  'marginRight': '30px',
  '@mobile': {
    gap: 'clamp(0px, calc(20vw - 64px), 8px)',
    width: 'auto',
    flexShrink: 0,
    marginLeft: spacing.s0,
    marginRight: spacing.s0,
  },
});

const SName = styled('span', {
  ...typography.title4,
  'width': '5em',
  'boxSizing': 'content-box',
  'flexShrink': 0,
  'minWidth': 0,
  'paddingInline': spacing.s20,
  'color': colors.fg.neutral.bold,
  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
  '@mobile': {
    ...typography.heading4,
    width: '5em',
    paddingInline: spacing.s0,
  },
});

const SGeneration = styled('div', {
  'textAlign': 'center',
  '@mobile': {
    'display': 'flex',
    'justifyContent': 'center',
    'width': 'clamp(34px, calc(25vw - 46px), 44px)',
    'minWidth': 'max-content',
    'flexShrink': 0,
    '& > span': {
      padding: `3px ${spacing.s6}`,
    },
  },
});

const SPhone = styled('span', {
  ...typography.title4,
  'width': '136px',
  'textAlign': 'center',
  'color': colors.fg.neutral.subtle,
  '@mobile': {
    ...typography.label3,
    width: 'auto',
    paddingLeft: 'clamp(0px, calc(25vw - 80px), 10px)',
    paddingRight: 'clamp(0px, calc(30vw - 96px), 14px)',
    whiteSpace: 'nowrap',
  },
});

const SDeleteButton = styled(ActionButton, {
  '&&': {
    ...typography.label2,
    height: '42px',
    padding: `0 ${spacing.s20}`,
    marginLeft: spacing.s8,
    borderRadius: radius.full,
  },
  '@mobile': {
    '&&': {
      ...typography.label4,
      height: '32px',
      padding: `0 ${spacing.s12}`,
      marginLeft: spacing.s0,
    },
  },
});

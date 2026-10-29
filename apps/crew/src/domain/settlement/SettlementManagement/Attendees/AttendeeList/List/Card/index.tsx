import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton, Avatar, Tag } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

import type { Attendee } from '../../types';

type CardProps = Attendee;

const Card = ({ attendanceNumber, profileImage, name, recentGeneration, phone }: CardProps) => (
  <SCard>
    <SNumber>{attendanceNumber}</SNumber>
    <SProfile>
      <Avatar size={24} src={profileImage || undefined} strokeColor='neutralGhost' aria-hidden />
      <SName>{name}</SName>
    </SProfile>
    <SGeneration>
      <Tag size='small' shape='rect' variant='default' type='solid'>
        {recentGeneration}기
      </Tag>
    </SGeneration>
    <SPhone>{phone}</SPhone>
    <ActionButton
      size='xsmall'
      variant='secondary'
      onClick={() => {
        // @TODO: 참석자 삭제 API 연동 (장정훈)
      }}
    >
      삭제
    </ActionButton>
  </SCard>
);

export default Card;

const SCard = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'minWidth': 0,
  'padding': `${spacing.s20} ${spacing.s24}`,
  'borderRadius': '20px',
  'backgroundColor': colors.bg.neutral.ghost,
  '@mobile': {
    'padding': `${spacing.s16} ${spacing.s0}`,
    'borderRadius': 0,
    'borderBottom': `1px solid ${colors.stroke.neutral.subtle}`,
    'backgroundColor': 'transparent',
    '& > button': {
      marginLeft: 'auto',
    },
  },
});

const SNumber = styled('span', {
  ...typography.label2,
  'width': '60px',
  'textAlign': 'center',
  'color': colors.fg.neutral.bold,
  '@mobile': {
    display: 'none',
  },
});

const SProfile = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'width': '187px',
  'minWidth': 0,
  '@mobile': {
    width: 'auto',
  },
});

const SName = styled('span', {
  ...typography.heading4,
  color: colors.fg.neutral.bold,
  whiteSpace: 'nowrap',
});

const SGeneration = styled('div', {
  'width': '164px',
  'textAlign': 'center',
  '@mobile': {
    width: 'auto',
    marginLeft: spacing.s4,
  },
});

const SPhone = styled('span', {
  ...typography.label3,
  'width': '166px',
  'textAlign': 'center',
  'color': colors.fg.neutral.subtle,
  '@mobile': {
    width: 'auto',
    marginLeft: spacing.s16,
    marginRight: spacing.s8,
    whiteSpace: 'nowrap',
  },
});

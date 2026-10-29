import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton, Avatar, Tag } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

import type { Attendee } from '../../types';

type CardProps = Attendee;

const Card = ({ attendanceNumber, profileImage, name, recentGeneration, phone }: CardProps) => (
  <SCard>
    <SInfo>
      <SNumber>{attendanceNumber}</SNumber>
      <SProfile>
        <Avatar size={24} src={profileImage || undefined} strokeColor='neutralGhost' aria-hidden />
        <SName>{name}</SName>
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

    <SDeleteButton
      size='xsmall'
      variant='secondary'
      onClick={() => {
        // @TODO: 참석자 삭제 API 연동 (장정훈)
      }}
    >
      삭제
    </SDeleteButton>
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
    padding: `${spacing.s16} ${spacing.s0}`,
    borderRadius: 0,
    borderBottom: `1px solid ${colors.stroke.neutral.subtle}`,
    backgroundColor: 'transparent',
  },
});

const SInfo = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'flex': 1,
  'minWidth': 0,
  '@mobile': {
    flex: '0 1 245px',
    justifyContent: 'space-between',
  },
});

const SDetails = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': '30px',
  '@mobile': {
    gap: spacing.s16,
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
  'gap': spacing.s10,
  'minWidth': 0,
  'marginRight': '30px',
  '@mobile': {
    gap: spacing.s8,
    marginRight: spacing.s4,
  },
});

const SName = styled('span', {
  ...typography.heading4,
  color: colors.fg.neutral.bold,
  whiteSpace: 'nowrap',
});

const SGeneration = styled('div', {
  textAlign: 'center',
});

const SPhone = styled('span', {
  ...typography.title4,
  'width': '136px',
  'textAlign': 'center',
  'color': colors.fg.neutral.subtle,
  '@mobile': {
    ...typography.label3,
    width: '120px',
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
      marginLeft: 'auto',
    },
  },
});

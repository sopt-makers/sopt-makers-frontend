import { PART_NAME } from '@constant/option';
import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton, Avatar, Tag } from '@sopt-mds/ui';
import dayjs from 'dayjs';
import { styled } from 'stitches.config';

import { SETTLEMENT_STATUS_LABELS } from '../constant';
import type { SettlementDetail } from '../types';

interface InfoProps {
  settlement: Pick<
    SettlementDetail,
    'title' | 'diningDate' | 'imageUrl' | 'isEnded' | 'joinableParts' | 'leader' | 'isLeader'
  >;
}

const Info = ({ settlement: { title, diningDate, imageUrl, isEnded, joinableParts, leader, isLeader } }: InfoProps) => {
  const { isMobile } = useDisplay();

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
            <STitleText>{title}</STitleText>
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
              onClick={() => {
                // @TODO: 회식 종료 기능 연결 (장정훈)
              }}
            >
              회식 종료하기
            </SActionButton>
            <SActionButton
              size={isMobile ? 'medium' : 'large'}
              variant='secondary'
              onClick={() => {
                // @TODO: 회차 추가 기능 연결 (장정훈)
              }}
            >
              + 회차 추가하기
            </SActionButton>
          </SActions>
        )}
      </SContent>
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
  'display': 'flex',
  'gap': spacing.s8,
  'marginTop': spacing.s12,
  'color': colors.fg.neutral.bold,
  '@mobile': {
    ...typography.label1,
    gap: spacing.s4,
    marginTop: spacing.s10,
  },
});

const SDate = styled('span', {
  color: colors.fg.neutral.subtle,
  flexShrink: 0,
});

const STitleText = styled('span', {
  minWidth: 0,
  overflowWrap: 'anywhere',
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

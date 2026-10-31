import { PART_NAME } from '@constant/option';
import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { Avatar, Tag } from '@sopt-mds/ui';
import dayjs from 'dayjs';
import { styled } from 'stitches.config';

import { SETTLEMENT_STATUS_LABELS } from '../constant';
import type { SettlementDetail } from '../types';

interface InfoProps {
  settlement: Pick<SettlementDetail, 'title' | 'diningDate' | 'imageUrl' | 'isEnded' | 'joinableParts' | 'leader'>;
}

const Info = ({ settlement: { title, diningDate, imageUrl, isEnded, joinableParts, leader } }: InfoProps) => {
  const { isMobile } = useDisplay();

  return (
    <SInfo>
      <SImage src={imageUrl || '/group/assets/images/settlement/thumbnail.svg'} alt={imageUrl ? '' : '회식 이미지'} />
      <SContent>
        <STags>
          <Tag size={isMobile ? 'small' : 'medium'} shape='rect' variant={isEnded ? 'default' : 'primary'} type='solid'>
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
  'paddingTop': spacing.s80,
  'paddingBottom': spacing.s40,
  '@mobile': { padding: `${spacing.s24} ${spacing.s16} ${spacing.s40}` },
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
    ...typography.title3,
    lineHeight: '28px',
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

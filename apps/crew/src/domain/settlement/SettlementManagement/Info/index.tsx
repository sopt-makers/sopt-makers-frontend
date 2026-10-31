import { PART_NAME } from '@constant/option';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight } from '@sopt-mds/icons';
import { Tag } from '@sopt-mds/ui';
import dayjs from 'dayjs';
import Link from 'next/link';
import { styled } from 'stitches.config';

import type { SettlementDetail } from '../../types';

interface InfoProps {
  id: string;
  settlement: Pick<SettlementDetail, 'title' | 'diningDate' | 'imageUrl' | 'joinableParts'>;
}

const Info = ({ id, settlement: { title, diningDate, imageUrl, joinableParts } }: InfoProps) => {
  return (
    <SCard href={`/settlement/detail?id=${id}`}>
      <SImage src={imageUrl || '/group/assets/images/settlement/thumbnail.svg'} alt='' />
      <SInfo>
        <SParts>
          {joinableParts?.map((part) => (
            <Tag key={part} size='small' shape='rect' variant='default' type='solid'>
              {PART_NAME[part]}
            </Tag>
          ))}
        </SParts>
        <STitle>
          {diningDate && <SDate>[{dayjs(diningDate).format('YY.MM.DD')}]</SDate>} <span>{title}</span>
        </STitle>
      </SInfo>
      <IconChevronRight width={24} height={24} aria-hidden />
    </SCard>
  );
};

export default Info;

const SCard = styled(Link, {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s32,
  'marginTop': `calc(${spacing.s80} - ${spacing.s2})`,
  'padding': spacing.s32,
  'borderRadius': radius.r20,
  'backgroundColor': colors.bg.neutral.ghost,
  'color': colors.fg.neutral.subtle,
  'textDecoration': 'none',
  '@tablet': {
    marginTop: `calc(${spacing.s80} - ${spacing.s6})`,
  },
  '@mobile': {
    gap: spacing.s12,
    marginTop: `calc(${spacing.s40} + ${spacing.s20} - ${spacing.s2})`,
    padding: spacing.s16,
  },
});

const SImage = styled('img', {
  'width': '167px',
  'height': '109px',
  'flexShrink': 0,
  'objectFit': 'cover',
  'borderRadius': radius.r14,
  '@mobile': {
    width: '129px',
    height: '98px',
    borderRadius: radius.r12,
  },
});

const SInfo = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s16,
  'flex': 1,
  'minWidth': 0,
  '@mobile': {
    gap: spacing.s8,
  },
});

const SParts = styled('div', {
  display: 'flex',
  gap: spacing.s6,
});

const STitle = styled('h1', {
  ...typography.title1,
  'display': 'flex',
  'gap': spacing.s10,
  'color': colors.fg.neutral.bold,
  '@mobile': {
    ...typography.title5,
    flexDirection: 'column',
    gap: spacing.s0,
  },
});

const SDate = styled('span', {
  color: colors.fg.neutral.default,
});

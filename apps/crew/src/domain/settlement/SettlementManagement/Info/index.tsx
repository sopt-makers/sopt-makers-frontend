import { useSettlementDetailQueryOption } from '@api/settlement/query';
import Loader from '@common/loader/Loader';
import { PART_NAME } from '@constant/option';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight } from '@sopt-mds/icons';
import { Tag } from '@sopt-mds/ui';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import ErrorPage from 'next/error';
import Link from 'next/link';
import { styled } from 'stitches.config';

interface InfoProps {
  id: string;
}

const Info = ({ id }: InfoProps) => {
  // @TODO: 라우터 단 ErrorBoundary와 Suspense 적용하도록 리펙토링 하기 (장정훈)
  const { data: settlement, error, isPending } = useQuery(useSettlementDetailQueryOption(Number(id)));

  if (isPending) return <Loader />;
  if (!settlement) return <ErrorPage statusCode={isAxiosError(error) && error.response?.status === 404 ? 404 : 500} />;

  return (
    <SCard href={`/settlement/detail?id=${id}`}>
      <SImage src={settlement.imageUrl || '/group/assets/images/settlement/thumbnail.svg'} alt='' />
      <SInfo>
        <SParts>
          {settlement.joinableParts?.map((part) => (
            <Tag key={part} size='small' shape='rect' variant='default' type='solid'>
              {PART_NAME[part]}
            </Tag>
          ))}
        </SParts>
        <STitle>
          <SDate>[{dayjs(settlement.diningDate).format('YY.MM.DD')}]</SDate>
          <span>{settlement.title}</span>
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

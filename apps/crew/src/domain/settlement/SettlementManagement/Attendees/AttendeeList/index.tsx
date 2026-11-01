import { usePageParams } from '@hook/queryString/custom';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

import { ATTENDEE_PAGE_SIZES } from './constants';
import Filters from './Filters';
import { getMockAttendees, rounds } from './mock';
import PaginatedList from './PaginatedList';
import type { AttendeeFilterKey } from './types';

const AttendeeList = () => {
  const router = useRouter();
  const selectedRound = rounds.find((round) => String(round.roundId) === router.query.roundId);
  const roundId = selectedRound?.roundId ?? rounds[0].roundId;
  const take = ATTENDEE_PAGE_SIZES.find((value) => value === router.query.take) ?? '10';
  const date = router.query.date === 'asc' ? 'asc' : 'desc';
  const { value: page, setValue: setPage } = usePageParams();

  const updateFilter = (key: AttendeeFilterKey, value: string) => {
    void router.push({ pathname: router.pathname, query: { ...router.query, [key]: value, page: '1' } }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  // @TODO: 회차별 참석자 목록 API 연동 (장정훈)
  const attendeeData = getMockAttendees({ roundId, page: Number(page), take: Number(take), date });

  return (
    <SSection>
      <STitle>참석자</STitle>
      <Filters roundId={roundId} take={take} date={date} onChange={updateFilter} />
      <SListContent>
        <SListHeader aria-hidden='true'>
          <span>인원</span>
          <span>프로필</span>
          <span>최근 기수</span>
          <span>연락처</span>
        </SListHeader>
        <PaginatedList attendeeData={attendeeData} onPageChange={setPage} />
      </SListContent>
    </SSection>
  );
};

export default AttendeeList;

const SSection = styled('section', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s24,
  'marginTop': spacing.s40,
  '@mobile': {
    gap: spacing.s10,
    marginTop: spacing.s24,
  },
});

const STitle = styled('h2', {
  ...typography.heading1,
  'color': colors.fg.neutral.bold,
  '@desktop': {
    ...typography.title2,
  },
  '@mobile': {
    ...typography.heading4,
  },
});

const SListContent = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s28,
  '@mobile': {
    gap: spacing.s0,
  },
});

const SListHeader = styled('div', {
  'display': 'grid',
  'gridTemplateColumns': '60px 187px 164px 166px',
  'padding': `${spacing.s16} ${spacing.s24}`,
  'border': `1px solid ${colors.stroke.neutral.ghost}`,
  'borderRadius': '15px',
  'color': colors.fg.neutral.subtle,
  'opacity': 0.5,
  'textAlign': 'center',
  ...typography.heading4,
  '@mobile': {
    display: 'none',
  },
});

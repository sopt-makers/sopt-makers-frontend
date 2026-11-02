import Pagination from '@domain/list/Pagination';
import { spacing } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

import type { components } from '@/__generated__/schema';

import List from '../List';

interface PaginatedListProps {
  attendeeData: components['schemas']['DiningV2GetAttendeeManagementResponseDto'];
  onPageChange: (page: number) => void;
}

const PaginatedList = ({ attendeeData: { attendees, meta }, onPageChange }: PaginatedListProps) => {
  return (
    <SPaginatedList>
      <List attendees={attendees} />
      <SPagination aria-label='참석자 페이지'>
        <Pagination
          totalPagesLength={Math.max(1, meta.pageCount)}
          currentPageIndex={meta.page}
          changeCurrentPage={onPageChange}
        />
      </SPagination>
    </SPaginatedList>
  );
};

export default PaginatedList;

const SPaginatedList = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s24,
  '@mobile': {
    gap: spacing.s10,
  },
});

const SPagination = styled('nav', {
  'marginTop': spacing.s80,
  'marginBottom': spacing.s120,
  '@mobile': {
    marginTop: spacing.s40,
    marginBottom: spacing.s40,
  },
});

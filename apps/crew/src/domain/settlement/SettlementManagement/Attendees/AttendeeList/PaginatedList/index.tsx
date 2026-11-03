import { useDeleteSettlementAttendeeMutation } from '@api/settlement/mutation';
import { useSettlementAttendeesQueryOption } from '@api/settlement/query';
import type { GetSettlementAttendees } from '@api/settlement/type';
import Loader from '@common/loader/Loader';
import Pagination from '@domain/list/Pagination';
import { spacing } from '@sopt-mds/design-tokens';
import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

import List from '../List';

type PaginatedListProps = GetSettlementAttendees['request'] & {
  onPageChange: (page: number) => void;
};

const PaginatedList = ({ meetingId, roundId, page, take, date, onPageChange }: PaginatedListProps) => {
  const {
    data: { attendees, meta },
  } = useSuspenseQuery(useSettlementAttendeesQueryOption({ meetingId, roundId, page, take, date }));
  const { mutate: deleteAttendee, isPending } = useDeleteSettlementAttendeeMutation(meetingId);

  const handleDelete = (attendeeUserId: number) => {
    deleteAttendee(
      { roundId, attendeeUserId },
      {
        onSuccess: () => {
          if (meta.page > 1 && meta.page === meta.pageCount && attendees.length === 1) {
            onPageChange(meta.page - 1);
          }
        },
      },
    );
  };

  return (
    <SPaginatedList>
      <List attendees={attendees} onDelete={handleDelete} isDeleting={isPending} />
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

export default function PaginatedListSuspense(props: PaginatedListProps) {
  return (
    <Suspense fallback={<Loader />}>
      <PaginatedList {...props} />
    </Suspense>
  );
}

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

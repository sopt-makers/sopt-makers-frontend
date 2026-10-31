import { settlementListQueryOptions } from '@api/settlement/query';
import type { SettlementListParams, SettlementListTab } from '@api/settlement/type';
import Pagination from '@domain/list/Pagination';
import { SCardGrid } from '@shared/util/layout/CardGrid';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

import SettlementCard from '../SettlementCard';

interface SettlementListContentProps {
  tab: SettlementListTab;
  params: Omit<SettlementListParams, 'tab'>;
  enabled: boolean;
  onPageChange: (page: number) => void;
}

const SettlementList = ({ tab, params, onPageChange }: Omit<SettlementListContentProps, 'enabled'>) => {
  const queryParams: SettlementListParams = {
    ...params,
    tab,
    status: tab === 'ALL' ? params.status : undefined,
    part: tab === 'ALL' ? params.part : undefined,
  };
  const { data } = useSuspenseQuery(settlementListQueryOptions(queryParams));
  const { page } = params;

  const defaultEmptyMessage = tab === 'MY' ? '개설하거나 참여 중인 회식이 없어요.' : '아직 등록된 회식이 없어요.';

  const emptyMessage =
    queryParams.query || queryParams.status || queryParams.part
      ? '검색 조건에 맞는 회식이 없어요.'
      : defaultEmptyMessage;

  return (
    <>
      <SResults>
        <SCount role='status' aria-live='polite'>
          {data.meta.itemCount}개의 회식
        </SCount>
        {data.dinings.length > 0 ? (
          <SGrid isMine={tab === 'MY'}>
            {data.dinings.map((item) => (
              <SettlementCard
                key={item.meetingId}
                item={item}
                showManagementButton={tab === 'MY' && item.canManageAttendees}
              />
            ))}
          </SGrid>
        ) : (
          <SEmpty role='status'>{emptyMessage}</SEmpty>
        )}
      </SResults>
      <SPagination aria-label='회식 목록 페이지'>
        <Pagination totalPagesLength={data.meta.pageCount} currentPageIndex={page} changeCurrentPage={onPageChange} />
      </SPagination>
    </>
  );
};

const SettlementListContent = ({ enabled, ...props }: SettlementListContentProps) => {
  if (!enabled) return null;

  const { params } = props;

  return (
    <ErrorBoundary
      resetKeys={[params.page, params.status, params.part, params.query]}
      fallback={<SEmpty role='alert'>회식 목록을 불러오지 못했어요.</SEmpty>}
    >
      <Suspense fallback={<SEmpty role='status'>회식 목록을 불러오고 있어요.</SEmpty>}>
        <SettlementList {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default SettlementListContent;

const SResults = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s24,
  '@tablet': { maxWidth: 380, width: '100%', marginInline: 'auto' },
  '@mobile': { maxWidth: 'none', gap: spacing.s4 },
});

const SCount = styled('p', {
  ...typography.title4,
  'color': colors.fg.neutral.bold,
  '@mobile': { ...typography.title5 },
});

const SEmpty = styled('p', {
  ...typography.body2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 260,
  color: colors.fg.neutral.subtle,
});

const SGrid = styled(SCardGrid, {
  'rowGap': 60,
  '@mobile': { rowGap: 0 },
  'variants': {
    isMine: {
      true: {
        '@mobile': { rowGap: spacing.s4 },
      },
    },
  },
});

const SPagination = styled('nav', {
  'marginTop': spacing.s80,
  '@mobile': { marginTop: spacing.s32, marginBottom: spacing.s32 },
});

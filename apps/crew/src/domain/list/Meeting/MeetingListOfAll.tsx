import { useBannerQueryOption } from '@api/banner/query';
import { useMeetingListQueryOption } from '@api/meeting/query';
import type { MeetingData } from '@api/meeting/type';
import { useUserProfileQueryOption } from '@api/user/query';
import CardSkeleton from '@domain/list/Card/Skeleton';
import { usePageParams } from '@hook/queryString/custom';
import { useDisplay } from '@hook/useDisplay';
import { useScrollRestorationAfterLoading } from '@hook/useScrollRestoration';
import { Suspense } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

import Card from '../Card';
import EmptyView from '../EmptyView';
import GridLayout from '../Grid/Layout';
import Pagination from '../Pagination';

function MeetingListOfAll() {
  const { value: page, setValue: setPage } = usePageParams();
  const { isDesktop } = useDisplay();
  const { data: meetingListData, isLoading } = useSuspenseQuery(useMeetingListQueryOption());
  const { data: bannerData } = useSuspenseQuery(useBannerQueryOption('cr_main'));

  useScrollRestorationAfterLoading(isLoading);
  const { data: me } = useQuery(useUserProfileQueryOption());

  const banner = bannerData?.data?.[0];

  useEffect(() => {
    ampli.impressionBanner({
      banner_id: undefined,
      banner_url: banner?.link ?? undefined,
      banner_timestamp: banner?.start_date,
    });
  }, [banner]);

  return (
    <main>
      <SMeetingCountWrapper>
        <SMeetingCount>{meetingListData?.meta.itemCount}개의 모임</SMeetingCount>
      </SMeetingCountWrapper>
      {meetingListData?.meetings.length ? (
        <>
          <GridLayout mobileType='list'>
            {meetingListData.meetings.slice(0, 2).map((meetingData: MeetingData) => (
              <Card key={meetingData.id} meetingData={meetingData} mobileType='list' />
            ))}

            {banner &&
              meetingListData?.meta.page === 1 &&
              (() => {
                const bannerImage = isDesktop ? (
                  <img
                    src={banner.pc_url}
                    style={{ width: '380px', height: '506px', borderRadius: '12px', objectFit: 'cover' }}
                    alt='광고 구좌 이미지'
                  />
                ) : (
                  <img
                    src={banner.mobile_url}
                    style={{ width: '100%', height: '92px', borderRadius: '8px', objectFit: 'cover' }}
                    alt='광고 구좌 이미지'
                  />
                );

                return banner.link ? (
                  <Link
                    href={banner.link}
                    target='_blank'
                    onClick={() =>
                      ampli.clickBanner({
                        banner_id: undefined,
                        banner_url: banner.link ?? undefined,
                        banner_timestamp: banner.start_date,
                        user_id: Number(me?.orgId),
                      })
                    }
                  >
                    {bannerImage}
                  </Link>
                ) : (
                  bannerImage
                );
              })()}
            {meetingListData?.meetings.slice(2).map((meetingData) => (
              <Card key={meetingData.id} meetingData={meetingData} mobileType='list' />
            ))}
          </GridLayout>

          <PaginationWrapper>
            <Pagination
              totalPagesLength={meetingListData?.meta.pageCount}
              currentPageIndex={Number(page)}
              changeCurrentPage={setPage}
            />
          </PaginationWrapper>
        </>
      ) : (
        <EmptyView message='검색 결과가 없습니다.' />
      )}
    </main>
  );
}

export default function MeetingListOfAllSuspense() {
  return (
    <Suspense
      fallback={
        <GridLayout mobileType='list'>
          {new Array(6).fill(null).map((_, index) => (
            <CardSkeleton key={index} mobileType='list' />
          ))}
        </GridLayout>
      }
    >
      <MeetingListOfAll />
    </Suspense>
  );
}

const PaginationWrapper = styled('div', {
  my: '$80',
});

const SMeetingCountWrapper = styled('div', {
  'display': 'flex',

  '@new_mobile': { mt: '$28' },
  '@new_tablet': { mt: '$40' },
  '@new_desktop': { mt: '$40' },
  '@new_laptop': { mt: '$40' },
});

const SMeetingCount = styled('p', {
  'fontStyle': 'H3',
  '@media (max-width: 849px)': {
    width: '380px',
  },
  '@mobile': {
    fontAg: '14_semibold_100',
    width: '100%',
  },
});

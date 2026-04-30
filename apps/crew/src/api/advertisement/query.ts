import AdvertisementQueryKey from '@api/advertisement/AdvertisementQueryKey';
import { queryOptions } from '@tanstack/react-query';
import type { AdvertisementCategoryType } from '@type/advertisement';

import { getAdvertisementList, getEventBannerInfo } from '.';

export const useGetAdvertisementQueryOption = (category: AdvertisementCategoryType) => {
  return queryOptions({
    queryKey: AdvertisementQueryKey.list(category),
    queryFn: () => getAdvertisementList(category),
  });
};

export const useEventBannerInfoQueryOption = () => {
  return queryOptions({
    queryKey: AdvertisementQueryKey.event(),
    queryFn: getEventBannerInfo,
  });
};

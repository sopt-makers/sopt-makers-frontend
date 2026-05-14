import AdvertisementQueryKey from '@api/advertisement/AdvertisementQueryKey';
import type { EventBannerEventType } from '@api/advertisement/type';
import { queryOptions } from '@tanstack/react-query';
import type { AdvertisementCategoryType } from '@type/advertisement';

import { getAdvertisementList, getEventBannerInfo } from '.';

export const useAdvertisementQueryOption = (category: AdvertisementCategoryType) => {
  return queryOptions({
    queryKey: AdvertisementQueryKey.list(category),
    queryFn: () => getAdvertisementList(category),
  });
};

export const useEventBannerInfoQueryOption = (eventType: EventBannerEventType) => {
  return queryOptions({
    queryKey: AdvertisementQueryKey.event(),
    queryFn: () => getEventBannerInfo(eventType),
  });
};

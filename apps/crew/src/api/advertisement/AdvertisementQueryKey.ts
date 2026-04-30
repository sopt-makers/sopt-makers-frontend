import type { AdvertisementCategoryType } from '@type/advertisement';

const AdvertisementQueryKey = {
  all: () => ['advertisement'] as const,
  list: (category: AdvertisementCategoryType) => [...AdvertisementQueryKey.all(), category] as const,
  event: () => [...AdvertisementQueryKey.all(), 'event'] as const,
};

export default AdvertisementQueryKey;

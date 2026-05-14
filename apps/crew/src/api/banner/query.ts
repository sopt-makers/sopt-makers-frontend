import BannerQueryKey from '@api/banner/BannerQueryKey';
import { queryOptions } from '@tanstack/react-query';

import { getBanners } from '.';

export const useBannerQueryOption = (location: string) => {
  return queryOptions({
    queryKey: BannerQueryKey.list(location),
    queryFn: () => getBanners(location),
  });
};

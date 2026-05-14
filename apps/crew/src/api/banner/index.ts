import type { GetBannersResponse } from '@api/banner/type';

import { operationApi } from '..';

export const getBanners = async (location: string) => {
  const { data } = await operationApi.get<GetBannersResponse>('/api/v1/banners/images', {
    params: { location },
  });
  return data;
};

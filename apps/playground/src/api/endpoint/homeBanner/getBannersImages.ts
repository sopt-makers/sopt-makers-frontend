import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { operationHttpClient } from '@/api';
import { createEndpoint } from '@/api/createEndpoint';

const BannerImageSchema = z.object({
  pc_url: z.string(),
  mobile_url: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  link: z.string(),
});

export const BannersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(BannerImageSchema),
});

export const getBannersImages = createEndpoint({
  request: ({ location }: { location: string }) => ({
    method: 'GET',
    url: 'api/v1/banners/images',
    searchParams: {
      location,
    },
  }),
  serverResponseScheme: BannersResponseSchema,
  client: operationHttpClient,
});

export const useBannersImages = () =>
  useQuery({
    queryKey: getBannersImages.cacheKey({ location: 'pg_community' }), //pg_community, cr_main, cr_feed 중 플그로 location 고정
    queryFn: () => getBannersImages.request({ location: 'pg_community' }),
  });

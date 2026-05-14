import type { paths } from '@/__generated__/schema2';

export type GetAdvertisementResponse =
  paths['/advertisement/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type AdvertisementCategoryType = 'POST' | 'MEETING';

export type GetEventPeriodBanner =
  paths['/advertisement/v2/meeting/top']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type EventBannerEventType = paths['/advertisement/v2/meeting/top']['get']['parameters']['query']['eventType'];

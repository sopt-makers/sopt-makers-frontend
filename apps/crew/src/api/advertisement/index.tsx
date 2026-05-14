import type {
  AdvertisementCategoryType,
  EventBannerEventType,
  GetAdvertisementResponse,
  GetEventPeriodBanner,
} from '@api/advertisement/type';

import { api } from '..';

export const getAdvertisementList = async (category: AdvertisementCategoryType) => {
  const { data } = await api.get<GetAdvertisementResponse>(`/advertisement/v2?category=${category}`);
  return data;
};

export const getEventBannerInfo = async (eventType: EventBannerEventType) => {
  const { data } = await api.get<GetEventPeriodBanner>(`/advertisement/v2/meeting/top?eventType=${eventType}`);
  return data;
};

import type { FormType } from '@domain/map/Form/type';

import { getCategoryLabel } from './constant';
import type { GetMapDetail } from './type';

export const deserializeSoptMapData = (data: GetMapDetail['response']): FormType => {
  const code = data.tags?.[0];
  const label = code ? getCategoryLabel(code) : '';

  return {
    name: data.placeName ?? '',
    subwayStations: data.stationNames?.map((station) => ({ name: station })) ?? [],
    description: data.description ?? '',
    category: {
      label,
      value: label,
    },
    links: {
      naverMapLink: data.naverLink ?? '',
      kakaoMapLink: data.kakaoLink ?? '',
    },
  };
};

export type ServerCategory = 'FOOD' | 'CAFE' | 'ETC';

export const SERVER_CATEGORY_MAP: Record<string, ServerCategory> = {
  카페: 'CAFE',
  음식점: 'FOOD',
  기타: 'ETC',
};

export const getCategoryLabel = (category: ServerCategory) =>
  Object.keys(SERVER_CATEGORY_MAP).find((label) => SERVER_CATEGORY_MAP[label] === category) ?? '';

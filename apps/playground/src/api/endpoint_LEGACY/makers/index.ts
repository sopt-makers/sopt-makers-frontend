import { httpClient } from '@/api';
import type { Maker } from '@/api/endpoint_LEGACY/makers/types';

export const getMakersProfile = async () => {
  const data = await httpClient.request<Maker[]>(`makers/profile`, { method: 'GET' });

  return data;
};

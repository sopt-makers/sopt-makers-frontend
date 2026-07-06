import type { GetFlash, PostFlash, PutFlash } from '@api/flash/type';
import { api } from '@api/index';

export const postFlash = async (formData: PutFlash['request']) => {
  return (await api.post<PostFlash['response']>('/flash/v2', formData)).data;
};

export const getFlash = async (meetingId: number): Promise<GetFlash['response']> => {
  return (await api.get<GetFlash['response']>(`/flash/v2/${meetingId}`)).data;
};

export const putFlash = async (meetingId: number, formData: PutFlash['request']) => {
  return (await api.put<PutFlash['response']>(`/flash/v2/${meetingId}`, formData)).data;
};

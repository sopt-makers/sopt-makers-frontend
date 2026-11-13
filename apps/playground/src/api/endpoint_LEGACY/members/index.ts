import { httpClient } from '@/api';
import type {
  Member,
  PagedMemberProfile,
  PostMemberMessageVariables,
  Profile,
  ProfileDetail,
  ProfileRequest,
} from '@/api/endpoint_LEGACY/members/type';

// 멤버 프로필 전체 조회
export const getMemberProfile = async (input: string) => {
  const data = await httpClient.request<PagedMemberProfile>(`api/v1/members/profile${input}`, { method: 'GET' });

  return data;
};

// 유저 id로 조회
export const getMemberById = async (id: number) => {
  const data = await httpClient.request<Member>(`api/v1/members/${id}`, { method: 'GET' });

  return data;
};

// 멤버 프로필 조회
export const getMemberProfileById = async (id: number | undefined) => {
  if (typeof id === 'undefined') throw new Error('Invalid id');
  const data = await httpClient.request<ProfileDetail>(`api/v1/members/profile/${id}`, { method: 'GET' });

  return data;
};

// 자신의 토큰으로 프로필 조회
export const getMemberProfileOfMe = async () => {
  const data = await httpClient.request<ProfileDetail>(`api/v1/members/profile/me`, { method: 'GET' });

  return data;
};

export const putMemberProfile = async (body: ProfileRequest): Promise<Profile> => {
  const data = await httpClient.request<Profile>('api/v1/members/profile', { method: 'PUT', json: body });
  return data;
};

export const getMembersSearchByName = async (name: string) => {
  const data = await httpClient.request<Member[]>(`api/v1/members/search?name=${name}`, { method: 'GET' });
  return data;
};

export const postMemberMessage = async (variables: PostMemberMessageVariables) => {
  const data = await httpClient.request<{
    success: boolean;
    message: string;
  }>('api/v1/members/coffeechat', { method: 'POST', json: variables });
  return data;
};

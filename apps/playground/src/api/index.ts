import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosHeaders } from 'axios';

import { tokenStorage } from '@/components/auth/util/accessToken';
import { ADMIN_API_KEY, ADMIN_API_URL, API_URL, AUTH_API_URL, CREW_API_URL, OPERATION_API_URL } from '@/constants/env';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});

export const axiosAuthInstance = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosAdminInstance = axios.create({
  baseURL: ADMIN_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'api-key': ADMIN_API_KEY,
  },
});

export const axiosCrewInstance = axios.create({
  baseURL: CREW_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});

// 어드민 운영 프로덕트 API 연결을 위한 axiosInstance
export const axiosOperationInstance = axios.create({
  baseURL: OPERATION_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'api-key': ADMIN_API_KEY,
  },
});

export type TokenRefreshRequestConfig = InternalAxiosRequestConfig & {
  _retriedAfterTokenRefresh?: boolean;
};

let pendingRefresh: { token: string | null; promise: Promise<string | null> } | undefined;
let lastRefresh: { previousToken: string | null; accessToken: string } | undefined;

const requestTokenRefresh = async (previousToken: string | null): Promise<string | null> => {
  try {
    const { data } = await axiosAuthInstance.post<{ data: { accessToken: string } }>('/api/v1/auth/refresh/web', null, {
      headers: { Authorization: `Bearer ${previousToken}` },
    });
    if (tokenStorage.get() !== previousToken) return null;

    const { accessToken } = data.data;
    tokenStorage.set(accessToken);
    lastRefresh = { previousToken, accessToken };
    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.status);
    }
    // 갱신 중 다른 토큰이 저장되면 이전 요청의 실패로 세션을 지우지 않습니다.
    if (tokenStorage.get() === previousToken) {
      tokenStorage.remove();
      if (window.location.pathname !== '/intro') window.location.replace('/intro');
    }
    throw new Error('토큰 갱신에 실패하였습니다.');
  }
};

const getOrStartTokenRefresh = (token: string | null): Promise<string | null> => {
  if (pendingRefresh?.token === token) return pendingRefresh.promise;

  const promise = requestTokenRefresh(token).finally(() => {
    if (pendingRefresh?.promise === promise) pendingRefresh = undefined;
  });
  pendingRefresh = { token, promise };
  return promise;
};

const handleAuthResponseError = async (error: AxiosError<unknown>, instance: AxiosInstance) => {
  const request: TokenRefreshRequestConfig | undefined = error.config;

  if (!error.response || !request) throw new Error('에러가 발생했습니다.');
  if (error.response.status !== 401 || request._retriedAfterTokenRefresh) throw error;

  const { pathname } = window.location;
  const skipsTokenRefresh =
    pathname === '/makers' || pathname === '/policy/person' || pathname.startsWith('/.well-known');
  if (skipsTokenRefresh) throw error;

  const currentToken = tokenStorage.get();
  if (currentToken === null && pathname !== '/intro') {
    window.location.replace('/intro');
    throw new Error('토큰이 없습니다.');
  }

  const headers = AxiosHeaders.from(request.headers);
  const requestAuthorization = headers.get('Authorization');
  // 이전 토큰의 401이 늦게 도착했다면 이미 발급된 토큰을 재사용합니다.
  const canReuseRefreshedToken =
    lastRefresh?.accessToken === currentToken && requestAuthorization === `Bearer ${lastRefresh.previousToken}`;
  const canRefreshCurrentToken = !requestAuthorization || requestAuthorization === `Bearer ${currentToken}`;
  if (!canReuseRefreshedToken && !canRefreshCurrentToken) throw error;

  const retryToken = canReuseRefreshedToken ? currentToken : await getOrStartTokenRefresh(currentToken);
  if (!retryToken || tokenStorage.get() !== retryToken) throw error;

  request._retriedAfterTokenRefresh = true;
  request.headers = headers.set('Authorization', `Bearer ${retryToken}`);
  return instance(request);
};

const registerAuthInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = tokenStorage.get();
      if (token && config.headers && config.headers.Authorization === undefined) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<unknown>) => handleAuthResponseError(error, instance),
  );
};

registerAuthInterceptors(axiosInstance);
registerAuthInterceptors(axiosCrewInstance);

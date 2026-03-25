import { ACCESS_TOKEN_KEY, getAuthToken, redirectToLoginPage } from '@shared/util/auth';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { authToken } from '@/store/tokenStore';

import { authApi } from './index';

export const checkToken = (config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();

  if (token && config.headers && !config.headers.Authorization) {
    if (authToken.get() !== token) {
      authToken.set(token);
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

let refreshPromise: Promise<string> | null = null;

export const refreshToken = async (error: AxiosError<unknown>, instance: AxiosInstance) => {
  const originRequest = error.config;

  if (!error.response || !originRequest) throw new Error('에러가 발생했습니다.');

  const { status } = error.response;

  if (status === 401) {
    if (!refreshPromise) {
      const currentToken = getAuthToken();

      if (!currentToken) {
        redirectToLoginPage();
        return Promise.reject(error);
      }

      refreshPromise = authApi
        .post<{ data: { accessToken: string } }>(`/api/v1/auth/refresh/web`, null, {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        })
        .then(({ data }) => {
          const newToken = data.data.accessToken;
          localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
          authToken.set(newToken);
          return newToken;
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          redirectToLoginPage();
          throw new Error('토큰 갱신에 실패하였습니다.');
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const newToken = await refreshPromise;
    originRequest.headers.Authorization = `Bearer ${newToken}`;
    return instance(originRequest);
  }

  return Promise.reject(error);
};

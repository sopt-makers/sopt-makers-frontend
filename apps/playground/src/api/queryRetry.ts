import { isAxiosError } from 'axios';

import type { TokenRefreshRequestConfig } from '@/api';

const isUnauthorizedAfterTokenRefresh = (error: unknown) => {
  if (!isAxiosError(error) || error.response?.status !== 401) return false;

  const request: TokenRefreshRequestConfig | undefined = error.config;
  return request?._retriedAfterTokenRefresh === true;
};

export const shouldRetryQuery = (failureCount: number, error: unknown) =>
  failureCount < 1 && !isUnauthorizedAfterTokenRefresh(error);

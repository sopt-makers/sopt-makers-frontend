import { ApiError } from '@/api/apiError';

export const shouldRetryQuery = (failureCount: number, error: unknown) => {
  if (failureCount >= 1) return false;
  if (!(error instanceof ApiError)) return true;

  const isUnauthorizedAfterRefresh = error.status === 401 && error.authRetryAttempted;
  return error.kind !== 'cancelled' && !isUnauthorizedAfterRefresh;
};

import { ApiError } from '@/api/apiError';
import { createHttpClient } from '@/api/httpClient';
import { createTokenRefresh } from '@/api/tokenRefresh';
import { tokenStorage } from '@/components/auth/util/accessToken';
import { ADMIN_API_KEY, ADMIN_API_URL, API_URL, AUTH_API_URL, CREW_API_URL, OPERATION_API_URL } from '@/constants/env';

export const authHttpClient = createHttpClient({ baseUrl: AUTH_API_URL, credentials: 'include' });

const redirectToIntro = () => {
  if (typeof window !== 'undefined' && window.location.pathname !== '/intro') window.location.replace('/intro');
};

const prepareTokenRefresh = () => {
  if (typeof window === 'undefined') return false;
  const { pathname } = window.location;
  const skipsTokenRefresh =
    pathname === '/makers' || pathname === '/policy/person' || pathname.startsWith('/.well-known');
  if (skipsTokenRefresh) return false;

  if (tokenStorage.get() === null && pathname !== '/intro') {
    redirectToIntro();
    throw new Error('토큰이 없습니다.');
  }
  return true;
};

const requestAccessTokenRefresh = async (previousToken: string | null): Promise<string> => {
  try {
    const response = await authHttpClient.request<{ data: { accessToken: string } }>('api/v1/auth/refresh/web', {
      method: 'POST',
      headers: { Authorization: `Bearer ${previousToken}` },
    });
    return response.data.accessToken;
  } catch (error) {
    if (error instanceof ApiError && error.status !== undefined) console.error(error.status);
    throw error;
  }
};

const tokens = createTokenRefresh({
  storage: tokenStorage,
  requestRefresh: requestAccessTokenRefresh,
  onSessionExpired: redirectToIntro,
});

const auth = { tokens, prepareTokenRefresh };

export const httpClient = createHttpClient({ baseUrl: API_URL, auth });
export const crewHttpClient = createHttpClient({ baseUrl: CREW_API_URL, auth });
export const adminHttpClient = createHttpClient({ baseUrl: ADMIN_API_URL, headers: { 'api-key': ADMIN_API_KEY } });
export const operationHttpClient = createHttpClient({
  baseUrl: OPERATION_API_URL,
  headers: { 'api-key': ADMIN_API_KEY },
});

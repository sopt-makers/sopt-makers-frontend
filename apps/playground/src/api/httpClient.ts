import ky, { isHTTPError, isNetworkError, isTimeoutError } from 'ky';

import { ApiError } from '@/api/apiError';
import type { AuthPolicy } from '@/api/tokenRefresh';

export type HttpRequestOptions = Pick<RequestInit, 'method' | 'headers' | 'body' | 'signal'> & {
  json?: unknown;
  searchParams?: string | URLSearchParams | Record<string, string | number | boolean | undefined>;
  timeout?: number | false;
};

const parseResponseBody = (text: string): unknown => {
  if (text === '') return undefined;
  try {
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof SyntaxError) return text;
    throw error;
  }
};

type HttpClientOptions = {
  baseUrl: string;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
  auth?: AuthPolicy;
};

const resolveRequestUrl = (path: string, base: URL) => {
  const isAbsoluteUrl = /^([a-z][a-z\d+.-]*:)?\/\//i.test(path);
  // Axios처럼 앞의 /도 base URL의 경로 뒤에 이어 붙입니다.
  const url = new URL(isAbsoluteUrl ? path : `${base.href}${path.replace(/^\/+/, '')}`, base);
  if (url.origin !== base.origin) {
    throw new ApiError('클라이언트에 설정된 서비스 주소로만 요청할 수 있습니다.', { kind: 'unknown' });
  }
  return url;
};

const toApiError = (error: unknown, authRetryAttempted = false, signal?: AbortSignal | null): ApiError => {
  if (error instanceof ApiError) return error;
  if (isTimeoutError(error)) return new ApiError('요청 시간이 초과되었습니다.', { kind: 'timeout' });
  if (signal?.aborted || (error instanceof Error && error.name === 'AbortError')) {
    return new ApiError('요청이 취소되었습니다.', { kind: 'cancelled' });
  }
  if (isHTTPError(error)) {
    const isJsonResponse = /[/.+-]json(?:\s*;|$)/i.test(error.response.headers.get('content-type') ?? '');
    const data = typeof error.data === 'string' && !isJsonResponse ? parseResponseBody(error.data) : error.data;
    const details = typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {};
    const code = details.code ?? details.errorCode;
    return new ApiError(typeof details.message === 'string' ? details.message : `HTTP ${error.response.status}`, {
      kind: 'http',
      status: error.response.status,
      code: typeof code === 'string' || typeof code === 'number' ? code : undefined,
      data,
      authRetryAttempted,
    });
  }
  if (isNetworkError(error)) return new ApiError('서버에 연결할 수 없습니다.', { kind: 'network' });
  return new ApiError(error instanceof Error ? error.message : '요청에 실패했습니다.', { kind: 'unknown' });
};

export const createHttpClient = ({ baseUrl, headers, credentials = 'same-origin', auth }: HttpClientOptions) => {
  const base = new URL(baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
  const defaultHeaders = new Headers(headers);
  if (!defaultHeaders.has('Accept')) defaultHeaders.set('Accept', '*/*');

  const client = ky.create({
    headers: defaultHeaders,
    credentials,
    timeout: false,
    parseJson: parseResponseBody,
    // 일반 재시도는 Query가 담당하고, 인증 갱신 뒤의 강제 재전송만 한 번 허용합니다.
    retry: auth ? { limit: 1, shouldRetry: () => false } : 0,
    hooks: {
      beforeRequest: [
        ({ request }) => {
          const token = auth?.tokens.getAccessToken();
          if (token && !request.headers.has('Authorization')) request.headers.set('Authorization', `Bearer ${token}`);
        },
      ],
      afterResponse: [
        async ({ request, response, retryCount }) => {
          if (response.status !== 401 || retryCount > 0 || !auth) return;
          if (!auth.prepareTokenRefresh()) return;

          const retryToken = await auth.tokens.refreshOrReuseAccessToken(request.headers.get('Authorization'));
          if (!retryToken || auth.tokens.getAccessToken() !== retryToken) return;
          request.signal.throwIfAborted();

          const retryHeaders = new Headers(request.headers);
          retryHeaders.set('Authorization', `Bearer ${retryToken}`);
          return ky.retry({ request: new Request(request, { headers: retryHeaders }), delay: 0 });
        },
      ],
      beforeError: [({ error, request, retryCount }) => toApiError(error, retryCount > 0, request.signal)],
    },
  });

  const request = async <ResponseData = unknown>(
    path: string,
    options: HttpRequestOptions = {},
  ): Promise<ResponseData> => {
    try {
      const url = resolveRequestUrl(path, base);
      const text = await client(url, options).text();
      return parseResponseBody(text) as ResponseData;
    } catch (error) {
      throw toApiError(error, false, options.signal);
    }
  };

  return { request };
};

export type HttpClient = ReturnType<typeof createHttpClient>;

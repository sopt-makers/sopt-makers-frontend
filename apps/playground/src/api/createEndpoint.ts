import type { z } from 'zod';

import { httpClient } from '@/api';
import type { HttpClient, HttpRequestOptions } from '@/api/httpClient';
import { DEBUG } from '@/constants/env';

interface Endpoint<ServerResponse, Params extends unknown[]> {
  request(...params: Params): Promise<ServerResponse>;
  cacheKey(...params: Params): [...keys: string[], ...params: Params];
}

type EndpointRequest = HttpRequestOptions & { url: string };

export function createEndpoint<
  Validator extends z.ZodType,
  Param extends unknown[] = [],
  Transformed = z.infer<Validator>,
>(config: {
  request: EndpointRequest | ((...params: Param) => EndpointRequest);
  serverResponseScheme: Validator;
  transformer?: (original: z.infer<Validator>) => Transformed;
  client?: HttpClient;
}): Endpoint<Transformed, Param> {
  const getConfig = (params: Param) => {
    if (typeof config.request === 'function') {
      return config.request(...params);
    }
    return config.request;
  };

  return {
    async request(...params) {
      const { url, ...options } = getConfig(params);
      const client = config.client ?? httpClient;

      const data = await client.request<unknown>(url, options);

      const res = config.serverResponseScheme.safeParse(data);

      if (!res.success) {
        const zodError = String(res.error).slice(0, 1000) + '\n...';
        const message = `서버 타입 검증에 실패했습니다. (${options.method} ${url})\n${zodError}`;
        console.error(message, zodError);

        if (DEBUG) {
          throw new Error(message);
        }

        return data;
      }

      return res.data;
    },
    cacheKey(...params) {
      const { method, url } = getConfig(params);

      return [method ?? 'GET', url, ...params];
    },
  };
}

export type GetResponseType<T> = T extends Endpoint<infer R, unknown[]> ? R : never;

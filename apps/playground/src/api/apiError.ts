export type ApiErrorKind = 'http' | 'network' | 'timeout' | 'cancelled' | 'unknown';

type ApiErrorDetails = {
  kind: ApiErrorKind;
  status?: number;
  code?: string | number;
  data?: unknown;
  authRetryAttempted?: boolean;
};

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly code?: string | number;
  readonly data?: unknown;
  readonly authRetryAttempted: boolean;

  constructor(message: string, details: ApiErrorDetails) {
    super(message);
    this.name = 'ApiError';
    this.kind = details.kind;
    this.status = details.status;
    this.code = details.code;
    this.data = details.data;
    this.authRetryAttempted = details.authRetryAttempted ?? false;
  }
}

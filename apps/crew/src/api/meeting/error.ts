import { isAxiosError } from 'axios';

export const getMeetingApplicationErrorMessage = (error: unknown) => {
  const fallbackMessage = '신청을 완료하지 못했어요. 잠시 후 다시 시도해주세요.';
  if (!isAxiosError<{ errorCode?: string }>(error)) return fallbackMessage;

  const status = error.response?.status;
  const message = error.response?.data?.errorCode;
  const serverMessage = typeof message === 'string' && message ? message : undefined;

  switch (status) {
    case 403:
      return serverMessage ?? '보안 확인에 실패했습니다. 새로고침 후 다시 시도해주세요.';
    case 429:
      return serverMessage ?? '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
    case 401:
      return '인증에 실패했어요. 다시 신청해주세요.';
    default:
      return serverMessage ?? fallbackMessage;
  }
};

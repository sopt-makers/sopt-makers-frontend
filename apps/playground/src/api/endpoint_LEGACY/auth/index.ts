import { httpClient } from '@/api';

// 토큰으로 자기 자신 확인
export const postRegistrationInfo = async (registerToken: string) => {
  const data = await httpClient.request<{
    name: string;
    generation: number;
  }>('api/v1/registration/info', {
    method: 'POST',
    json: {
      registerToken,
    },
  });

  return data;
};

// email 발송
export const postRegistrationEmail = async (email: string) => {
  const data = await httpClient.request<{
    success: boolean;
    code: string;
    message: string;
  }>('api/v1/registration/email', {
    method: 'POST',
    json: {
      email,
    },
  });

  return data;
};

// facebook register
export const postFacebookRegistration = async ({ code, registerToken }: { code: string; registerToken: string }) => {
  const data = await httpClient.request<{ accessToken: string }>(`api/v1/idp/facebook/register`, {
    method: 'POST',
    json: {
      code,
      registerToken,
    },
  });

  return data;
};

// facebook auth
export const postFacebookAuth = async ({ code }: { code: string }) => {
  const data = await httpClient.request<{ accessToken: string }>(`api/v1/idp/facebook/auth`, {
    method: 'POST',
    json: {
      code,
    },
  });

  return data;
};

export const postGoogleRegistration = async ({ code, registerToken }: { code: string; registerToken: string }) => {
  const data = await httpClient.request<{ accessToken: string }>(`api/v1/idp/google/register`, {
    method: 'POST',
    json: {
      code,
      registerToken,
    },
  });

  return data;
};

export const postGoogleAuth = async ({ code }: { code: string }) => {
  const data = await httpClient.request<{ accessToken: string }>(`api/v1/idp/google/auth`, {
    method: 'POST',
    json: {
      code,
    },
  });

  return data;
};

export const postAppleRegistration = async ({ code, registerToken }: { code: string; registerToken: string }) => {
  const data = await httpClient.request<{ accessToken: string }>(`api/v1/idp/apple/register`, {
    method: 'POST',
    json: {
      code,
      registerToken,
    },
  });

  return data;
};

export const postAppleAuth = async ({ code }: { code: string }) => {
  const data = await httpClient.request<{ accessToken: string }>(`api/v1/idp/apple/auth`, {
    method: 'POST',
    json: {
      code,
    },
  });

  return data;
};

export const postSSOCode = async ({ accessToken }: { accessToken: string }) => {
  const data = await httpClient.request<{ code: string }>(`api/v1/idp/sso/code`, {
    method: 'POST',
    json: {
      accessToken,
    },
  });

  return {
    code: data.code,
  };
};

export const postSMSCode = async ({
  phone,
}: {
  phone: string;
}): Promise<{ isSkipped: false } | { isSkipped: true; registerToken: string }> => {
  const data = await httpClient.request<{
    success: boolean;
    message: string;
    isSkipped: boolean;
    registerToken: string;
  }>('/api/v1/registration/sms/code', {
    method: 'POST',
    json: {
      phone,
    },
  });

  if (data.isSkipped) {
    return {
      isSkipped: true,
      registerToken: data.registerToken,
    };
  }

  return {
    isSkipped: false,
  };
};

export const postSMSToken = async ({ code }: { code: string }) => {
  const data = await httpClient.request<{ registerToken: string }>('/api/v1/registration/sms/token', {
    method: 'POST',
    json: {
      sixNumberCode: code,
    },
  });

  return {
    registerToken: data.registerToken,
  };
};

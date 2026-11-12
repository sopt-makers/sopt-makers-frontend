type TokenStorage = {
  get(): string | null;
  set(token: string): void;
  remove(): void;
};

type TokenRefreshOptions = {
  storage: TokenStorage;
  requestRefresh(token: string | null): Promise<string>;
  onSessionExpired(): void;
};

const matchesToken = (authorization: string | null, token: string | null) => {
  if (authorization === null) return token === null;
  return authorization === `Bearer ${token}`;
};

export const createTokenRefresh = ({ storage, requestRefresh, onSessionExpired }: TokenRefreshOptions) => {
  let pendingRefresh: { token: string | null; promise: Promise<string | null> } | undefined;
  let lastRefresh: { previousToken: string | null; accessToken: string } | undefined;

  const refreshToken = async (previousToken: string | null): Promise<string | null> => {
    try {
      const accessToken = await requestRefresh(previousToken);
      if (storage.get() !== previousToken) return null;

      storage.set(accessToken);
      lastRefresh = { previousToken, accessToken };
      return accessToken;
    } catch {
      // 이전 세션의 갱신 실패로 새로 로그인한 세션을 지우지 않습니다.
      if (storage.get() === previousToken) {
        storage.remove();
        onSessionExpired();
      }
      throw new Error('토큰 갱신에 실패하였습니다.');
    }
  };

  const refreshOrReuseAccessToken = (authorization: string | null): Promise<string | null> => {
    const currentToken = storage.get();
    const canReuseRefreshedToken =
      lastRefresh?.accessToken === currentToken && matchesToken(authorization, lastRefresh.previousToken);
    if (canReuseRefreshedToken) return Promise.resolve(currentToken);
    if (authorization && authorization !== `Bearer ${currentToken}`) return Promise.resolve(null);
    if (pendingRefresh?.token === currentToken) return pendingRefresh.promise;

    const promise = refreshToken(currentToken).finally(() => {
      if (pendingRefresh?.promise === promise) pendingRefresh = undefined;
    });
    pendingRefresh = { token: currentToken, promise };
    return promise;
  };

  return { getAccessToken: () => storage.get(), refreshOrReuseAccessToken };
};

export type AuthPolicy = {
  tokens: ReturnType<typeof createTokenRefresh>;
  prepareTokenRefresh(): boolean;
};

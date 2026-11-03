import { isProduction } from './environment';

export const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
export const TURNSTILE_TOKEN_HEADER = 'X-Turnstile-Token';
export const TURNSTILE_ACTION = 'apply';

export const getTurnstileSiteKey = (hostname: string) => {
  if (['localhost', '127.0.0.1', '[::1]'].includes(hostname)) {
    return '1x00000000000000000000AA';
  }

  return isProduction ? '0x4AAAAAAFvYweLoctp6kdLr' : '0x4AAAAAAFvZHm09aGeCG46L';
};

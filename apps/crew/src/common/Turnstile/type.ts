interface TurnstileOptions {
  'sitekey': string;
  'action': string;
  'appearance': 'interaction-only';
  'theme': 'dark';
  'size': 'flexible' | 'compact';
  'language': 'ko';
  'response-field': false;
  'refresh-expired': 'manual';
  'refresh-timeout': 'manual';
  'callback': (token: string) => void;
  'error-callback': (errorCode: string) => void;
  'expired-callback': () => void;
  'timeout-callback': () => void;
}

interface Turnstile {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  isExpired: (widgetId: string) => boolean;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

export type TurnstileStatus = 'loading' | 'ready' | 'error';

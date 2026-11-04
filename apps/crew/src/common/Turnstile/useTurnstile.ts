import { useCallback, useEffect, useRef, useState } from 'react';

import { getTurnstileSiteKey, TURNSTILE_ACTION, TURNSTILE_SCRIPT_ID } from './constant';
import type { TurnstileStatus } from './type';

export const useTurnstile = (enabled: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<TurnstileStatus>('loading');
  const [isScriptReady, setIsScriptReady] = useState(false);

  const updateToken = useCallback((nextToken: string | null) => {
    tokenRef.current = nextToken;
    setToken(nextToken);
  }, []);

  const handleError = useCallback(() => {
    updateToken(null);
    setStatus('error');
  }, [updateToken]);

  const reset = useCallback(() => {
    updateToken(null);
    const widgetId = widgetIdRef.current;

    if (widgetId === null || !window.turnstile) return;

    setStatus('loading');
    try {
      window.turnstile.reset(widgetId);
    } catch {
      handleError();
    }
  }, [handleError, updateToken]);

  useEffect(() => {
    updateToken(null);
    if (!enabled) return;

    setStatus('loading');
    if (!isScriptReady) return;

    const turnstile = window.turnstile;
    const container = containerRef.current;
    if (!turnstile || !container) {
      handleError();
      return;
    }

    let active = true;
    try {
      widgetIdRef.current = turnstile.render(container, {
        'sitekey': getTurnstileSiteKey(window.location.hostname),
        'action': TURNSTILE_ACTION,
        'appearance': 'interaction-only',
        'theme': 'dark',
        'size': container.clientWidth < 300 ? 'compact' : 'flexible',
        'language': 'ko',
        'response-field': false,
        'refresh-expired': 'manual',
        'refresh-timeout': 'manual',
        'callback': (nextToken) => {
          if (!active) return;
          updateToken(nextToken);
          setStatus('ready');
        },
        'error-callback': () => {
          if (active) handleError();
        },
        'expired-callback': () => {
          if (active) reset();
        },
        'timeout-callback': () => {
          if (active) reset();
        },
      });
    } catch {
      handleError();
    }

    return () => {
      active = false;
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      tokenRef.current = null;
      if (widgetId !== null) turnstile.remove(widgetId);
    };
  }, [enabled, handleError, isScriptReady, reset, updateToken]);

  const handleScriptReady = useCallback(() => {
    if (window.turnstile) setIsScriptReady(true);
  }, []);

  useEffect(() => {
    if (!enabled || isScriptReady) return;

    const script = document.getElementById(TURNSTILE_SCRIPT_ID);
    script?.addEventListener('load', handleScriptReady);
    script?.addEventListener('error', handleError);
    handleScriptReady();

    const timeout = window.setTimeout(handleError, 15_000);
    return () => {
      script?.removeEventListener('load', handleScriptReady);
      script?.removeEventListener('error', handleError);
      window.clearTimeout(timeout);
    };
  }, [enabled, handleError, handleScriptReady, isScriptReady]);

  const consumeToken = useCallback(() => {
    const widgetId = widgetIdRef.current;
    if (!enabled || !tokenRef.current || widgetId === null || !window.turnstile) return null;

    if (window.turnstile.isExpired(widgetId)) {
      reset();
      return null;
    }

    const currentToken = tokenRef.current;
    updateToken(null);
    return currentToken;
  }, [enabled, reset, updateToken]);

  const retry = useCallback(() => {
    if (widgetIdRef.current !== null && window.turnstile) {
      reset();
    } else {
      window.location.reload();
    }
  }, [reset]);

  return {
    containerRef,
    isReady: enabled && status === 'ready' && token !== null,
    status,
    handleScriptReady,
    handleError,
    consumeToken,
    reset,
    retry,
  };
};

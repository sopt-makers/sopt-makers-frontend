import { useRef } from 'react';

import type { TimeoutID } from '@/types';

const useAtomicTimeout = () => {
  const timeoutRef = useRef<TimeoutID | null>(null);

  return {
    set(handler: () => void, duration: number) {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handler, duration);
    },
  };
};

export default useAtomicTimeout;

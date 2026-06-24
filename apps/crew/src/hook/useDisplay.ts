import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function useDisplay() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  const mobile = useMediaQuery({ query: '(max-width: 767px)' });
  const tablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const desktop = useMediaQuery({ query: '(max-width: 1259px)' });
  const largeDesktop = useMediaQuery({ query: '(min-width: 1260px)' });

  useIsomorphicLayoutEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  useIsomorphicLayoutEffect(() => {
    setIsTablet(tablet);
  }, [tablet]);
  useIsomorphicLayoutEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);
  useIsomorphicLayoutEffect(() => {
    setIsLaptop(largeDesktop);
  }, [largeDesktop]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLaptop,
  };
}

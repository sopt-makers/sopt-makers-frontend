import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function useDisplay() {
  //@TODO: 반응형 정리 필요
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTable] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [isNewSmallMobile, setIsNewSmallMobile] = useState(false);
  const [isNewMobile, setIsNewMobile] = useState(false);
  const [isNewTablet, setIsNewTablet] = useState(false);
  const [isNewDesktop, setIsNewDesktop] = useState(false);
  const [isNewLaptop, setIsNewLaptop] = useState(false);

  const mobile = useMediaQuery({ query: '(max-width: 430px)' });
  const tablet = useMediaQuery({ query: '(max-width: 840px)' });
  const laptop = useMediaQuery({ query: '(max-width: 1259px)' });
  const desktop = useMediaQuery({ query: '(min-width: 768px)' });

  const newSmallMobile = useMediaQuery({ query: '(max-width: 360px)' });
  const newMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const newTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const newDesktop = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1259px)' });
  const newLaptop = useMediaQuery({ query: '(min-width: 1260px)' });

  useIsomorphicLayoutEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  useIsomorphicLayoutEffect(() => {
    setIsTable(tablet);
  }, [tablet]);
  useIsomorphicLayoutEffect(() => {
    setIsLaptop(laptop);
  }, [laptop]);
  useIsomorphicLayoutEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);
  useIsomorphicLayoutEffect(() => {
    setIsNewSmallMobile(newSmallMobile);
  }, [newSmallMobile]);
  useIsomorphicLayoutEffect(() => {
    setIsNewMobile(newMobile);
  }, [newMobile]);
  useIsomorphicLayoutEffect(() => {
    setIsNewTablet(newTablet);
  }, [newTablet]);
  useIsomorphicLayoutEffect(() => {
    setIsNewDesktop(newDesktop);
  }, [newDesktop]);
  useIsomorphicLayoutEffect(() => {
    setIsNewLaptop(newLaptop);
  }, [newLaptop]);

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isNewSmallMobile,
    isNewMobile,
    isNewTablet,
    isNewDesktop,
    isNewLaptop,
  };
}

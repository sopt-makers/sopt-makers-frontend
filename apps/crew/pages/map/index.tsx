import Loader from '@common/loader/Loader';
import DesktopMapContainer from '@domain/map/List/DesktopMapContainer';
import MobileMapContainer from '@domain/map/List/MobileMapContainer';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import { Suspense, useEffect } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const MapPage = () => {
  const { isMobile } = useDisplay();

  useEffect(() => {
    ampli.viewSoptmapTab();
  }, []);

  return (
    <>
      <SCrewTab />
      <Suspense fallback={<Loader />}>{isMobile ? <MobileMapContainer /> : <DesktopMapContainer />}</Suspense>
      <FloatingButton />
    </>
  );
};

export default MapPage;

const SCrewTab = styled(CrewTab, {
  '@tablet': {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '734px',
  },
  '@mobile': {
    position: 'static',
    left: 'auto',
    transform: 'none',
    width: '100%',
  },
});

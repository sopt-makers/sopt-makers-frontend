import Loader from '@common/loader/Loader';
import DesktopMapContainer from '@domain/map/List/DesktopMapContainer';
import MobileMapContainer from '@domain/map/List/MobileMapContainer';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import { Suspense, useEffect } from 'react';

import { ampli } from '@/ampli';

const MapPage = () => {
  const { isMobile } = useDisplay();

  useEffect(() => {
    ampli.viewSoptmapTab();
  }, []);

  return (
    <>
      <CrewTab />
      <Suspense fallback={<Loader />}>{isMobile ? <MobileMapContainer /> : <DesktopMapContainer />}</Suspense>
      <FloatingButton />
    </>
  );
};

export default MapPage;

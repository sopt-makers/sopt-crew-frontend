import { ampli } from '@/ampli';
import Loader from '@common/loader/Loader';
import DesktopMapContainer from '@domain/map/List/DesktopMapContainer';
import MobileMapContainer from '@domain/map/List/MobileMapContainer';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';
import { Suspense, useEffect } from 'react';

const MapPage = () => {
  const { isDesktop } = useDisplay();

  useEffect(() => {
    ampli.viewSoptmapTab();
  }, []);

  return (
    <div>
      <CrewTab />
      <Suspense fallback={<Loader />}>{isDesktop ? <DesktopMapContainer /> : <MobileMapContainer />}</Suspense>
      <FloatingButton />
    </div>
  );
};

export default MapPage;

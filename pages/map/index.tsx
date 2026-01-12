import Loader from '@common/loader/Loader';
import DesktopMapContainer from '@domain/map/List/DesktopMapContainer';
import MobileMapContainer from '@domain/map/List/MobileMapContainer';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import { Suspense } from 'react';

const MapPage = () => {
  const { isDesktop } = useDisplay();

  return (
    <div>
      <CrewTab />
      <Suspense fallback={<Loader />}>{isDesktop ? <DesktopMapContainer /> : <MobileMapContainer />}</Suspense>
    </div>
  );
};

export default MapPage;

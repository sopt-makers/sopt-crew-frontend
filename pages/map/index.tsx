import Filter from '@domain/map/Filter';
import MapList from '@domain/map/MapList';
import CrewTab from '@shared/CrewTab';
import FloatingButton from '@shared/FloatingButton';

const MapPage = () => {
  return (
    <div>
      <CrewTab />
      <Filter />
      <MapList />
      <FloatingButton />
    </div>
  );
};

export default MapPage;

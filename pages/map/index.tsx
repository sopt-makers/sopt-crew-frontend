import Filter from '@domain/map/Filter';
import MapList from '@domain/map/MapList';
import CrewTab from '@shared/CrewTab';

const MapPage = () => {
  return (
    <div>
      <CrewTab />
      <Filter />
      <MapList />
    </div>
  );
};

export default MapPage;

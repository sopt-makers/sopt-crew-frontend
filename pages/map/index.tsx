import { useMapListQueryOption } from '@api/map/query';
import Filter from '@domain/map/Filter';
import MapList from '@domain/map/MapList';
import CrewTab from '@shared/CrewTab';
import { useSuspenseQuery } from '@tanstack/react-query';

const MapPage = () => {
  const { data: mapList } = useSuspenseQuery(useMapListQueryOption());

  return (
    <div>
      <CrewTab />
      <Filter placeCount={mapList?.meta.itemCount} />
      <MapList mapList={mapList} />
    </div>
  );
};

export default MapPage;

import { mapData } from '@api/map/type';
import MapCard from '@domain/map/Card/index';
import { styled } from 'stitches.config';

interface MapListProps {
  mapList: mapData[];
}

const MapList = ({ mapList }: MapListProps) => {
  return (
    <SCardWrapper>
      {mapList.map(mapData => (
        <MapCard key={mapData.id} mapData={mapData} />
      ))}
    </SCardWrapper>
  );
};

const SCardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  mt: '$24',

  '@mobile': {
    mt: '$16',
    mb: '$40',
  },
});

export default MapList;

import MapCard from '@domain/map/Card/index';
import { styled } from 'stitches.config';

const MapList = () => {
  return (
    <main>
      <SCardWrapper>
        {[...Array(10)].map((_, index) => (
          <MapCard key={index} />
        ))}
      </SCardWrapper>
    </main>
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

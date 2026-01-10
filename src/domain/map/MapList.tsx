import { GetMapList } from '@api/map/type';
import MapCard from '@domain/map/Card/index';
import { usePageParams } from '@hook/queryString/custom';
import { useDisplay } from '@hook/useDisplay';
import { styled } from 'stitches.config';
import Pagination from './Pagination';

interface MapListProps {
  mapList: GetMapList['response'];
}

const MapList = ({ mapList }: MapListProps) => {
  const { isDesktop } = useDisplay();
  const { value: page, setValue: setPage } = usePageParams();

  return (
    <>
      <main>
        <SCardWrapper>
          {mapList?.soptMaps.map(mapData => (
            <MapCard key={mapData.id} mapData={mapData} />
          ))}
        </SCardWrapper>
      </main>
      {isDesktop && (
        <SPageWrapper>
          <Pagination totalPageLength={mapList.meta.pageCount} currentPage={Number(page)} onPageChange={setPage} />
        </SPageWrapper>
      )}
    </>
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

const SPageWrapper = styled('div', {
  mt: '$120',
  mb: '$80',

  '@mobile': {
    mb: '$60',
  },
});

export default MapList;

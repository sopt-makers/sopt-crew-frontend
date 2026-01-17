import { useMapListQueryOption } from '@api/map/query';
import Filter from '@domain/map/Filter';
import Pagination from '@domain/map/Pagination';
import { usePageParams } from '@hook/queryString/custom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';
import MapList from '../MapList';

const DesktopMapContainer = () => {
  const { data: mapList } = useSuspenseQuery(useMapListQueryOption());
  const { value: page, setValue: setPage } = usePageParams();

  return (
    <>
      <Filter placeCount={mapList.meta.itemCount} />
      <MapList mapList={mapList.soptMaps} />

      <SPageWrapper>
        <Pagination totalPageLength={mapList.meta.pageCount} currentPage={Number(page)} onPageChange={setPage} />
      </SPageWrapper>
    </>
  );
};

export default DesktopMapContainer;

const SPageWrapper = styled('div', {
  mt: '$120',
  mb: '$80',

  '@mobile': {
    mb: '$60',
  },
});

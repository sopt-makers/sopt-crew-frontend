import { useMapListInfiniteQueryOption } from '@api/map/query';
import Filter from '@domain/map/Filter';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import MapList from '../MapList';

const MobileMapContainer = () => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(useMapListInfiniteQueryOption());

  const ref = useInfiniteScroll({ hasNextPage, fetchNextPage });

  const allMaps = data.pages.flatMap(page => page.soptMaps);
  const totalCount = data.pages[0]?.meta.itemCount ?? 0;

  return (
    <>
      <Filter placeCount={totalCount} />
      <MapList mapList={allMaps} />

      <div ref={ref} style={{ height: 20 }} />
    </>
  );
};

export default MobileMapContainer;

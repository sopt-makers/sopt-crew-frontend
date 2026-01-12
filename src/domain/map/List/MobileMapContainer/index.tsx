import { useMapListInfiniteQueryOption } from '@api/map/query';
import Filter from '@domain/map/Filter';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MapList from '../MapList';

const MobileMapContainer = () => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(useMapListInfiniteQueryOption());

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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

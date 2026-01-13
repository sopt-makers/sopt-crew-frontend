import { queryOptions } from '@tanstack/react-query';
import { getSearchSubway } from '.';
import MapQueryKey from './MapQueryKey';

export const useSearchSubwayQueryOption = (query: string) => {
  return queryOptions({
    queryKey: MapQueryKey.searchSubway(query),
    queryFn: () => getSearchSubway(query),
  });
};

import { useCategoryParams, usePageParams, useSortTypeParams, useStationKeywordParams } from '@hook/queryString/custom';
import { queryOptions } from '@tanstack/react-query';
import { getMapList } from '.';
import MapQueryKey from './MapQueryKey';
import { GetMapList } from './type';

export const useMapListQueryOption = () => {
  const { value: category } = useCategoryParams();
  const { value: sortType } = useSortTypeParams();
  const { value: stationKeyword } = useStationKeywordParams();
  const { value: page } = usePageParams();

  type MapListRequest = NonNullable<GetMapList['request']>;

  const params: MapListRequest = {
    page: Number(page) || 1,
    take: 10,

    sortType: (sortType as MapListRequest['sortType']) ?? 'LATEST',

    category: category?.length ? (category.join(',') as unknown as MapListRequest['category']) : undefined,
    stationKeyword: stationKeyword as MapListRequest['stationKeyword'],
  };

  return queryOptions<GetMapList['response']>({
    queryKey: MapQueryKey.list(params),
    queryFn: () => getMapList(params),
    placeholderData: prev => prev,
  });
};

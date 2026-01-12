import {
  useCategoriesParams,
  usePageParams,
  useSortTypeParams,
  useStationKeywordParams,
} from '@hook/queryString/custom';
import { queryOptions } from '@tanstack/react-query';
import { getMapList } from '.';
import { SERVER_CATEGORY_MAP } from './constant';
import MapQueryKey from './MapQueryKey';
import { GetMapList } from './type';

export const useMapListQueryOption = () => {
  const { value: categories } = useCategoriesParams();
  const { value: sortType } = useSortTypeParams();
  const { value: stationKeyword } = useStationKeywordParams();
  const { value: page } = usePageParams();

  type MapListRequest = NonNullable<GetMapList['request']>;

  const convertedCategories = categories?.map(kor => SERVER_CATEGORY_MAP[kor]).filter(Boolean);

  const params: MapListRequest = {
    page: Number(page) || 1,
    take: 10,
    sortType: (sortType as MapListRequest['sortType']) ?? 'LATEST',
    categories: convertedCategories?.length
      ? (convertedCategories.join(',') as unknown as MapListRequest['categories'])
      : undefined,
    stationKeyword: stationKeyword as MapListRequest['stationKeyword'],
  };

  return queryOptions<GetMapList['response']>({
    queryKey: MapQueryKey.list(params),
    queryFn: () => getMapList(params),
    placeholderData: prev => prev,
  });
};

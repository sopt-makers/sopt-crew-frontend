import {
  useCategoriesParams,
  usePageParams,
  useSortTypeParams,
  useStationKeywordParams,
} from '@hook/queryString/custom';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { getMapList } from '.';
import { SERVER_CATEGORY_MAP } from './constant';
import MapQueryKey from './MapQueryKey';
import { GetMapList } from './type';

type MapListRequest = NonNullable<GetMapList['request']>;

const TAKES_PER_PAGE = 10;

export const useMapListQueryOption = () => {
  const { value: categories } = useCategoriesParams();
  const { value: sortType } = useSortTypeParams();
  const { value: stationKeyword } = useStationKeywordParams();
  const { value: page } = usePageParams();

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

export const useMapListInfiniteQueryOption = () => {
  const { value: categories } = useCategoriesParams();
  const { value: sortType } = useSortTypeParams();
  const { value: stationKeyword } = useStationKeywordParams();

  const convertedCategories = categories?.map(kor => SERVER_CATEGORY_MAP[kor]).filter(Boolean);

  const baseParams: Omit<MapListRequest, 'page'> = {
    take: TAKES_PER_PAGE,
    sortType: (sortType as MapListRequest['sortType']) ?? 'LATEST',
    categories: convertedCategories?.length
      ? (convertedCategories.join(',') as unknown as MapListRequest['categories'])
      : undefined,
    stationKeyword: stationKeyword as MapListRequest['stationKeyword'],
  };

  return infiniteQueryOptions<GetMapList['response']>({
    queryKey: [...MapQueryKey.list({ ...baseParams, page: 1 }), 'infinite'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return getMapList({ ...baseParams, page: pageParam as number });
    },
    getNextPageParam: (lastPage, allPages) => {
      const isLastPage = lastPage.soptMaps.length < TAKES_PER_PAGE;
      return isLastPage ? undefined : allPages.length + 1;
    },
  });
};

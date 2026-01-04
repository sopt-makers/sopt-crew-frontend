import { useKeywordParams } from '@hook/queryString/custom';
import { queryOptions } from '@tanstack/react-query';
import { getSubwayList } from '.';
import MapQueryKey from './MapQueryKey';

export const useSubwayListQueryOption = () => {
  const { value: keyword } = useKeywordParams();
  const params: { keyword?: string } = {};

  if (keyword?.length) {
    params.keyword = keyword.join(',');
  }
  return queryOptions({
    queryKey: MapQueryKey.subwayList(params),
    queryFn: () => getSubwayList(params),
  });
};

import AdvertisementQueryKey from '@api/advertisement/AdvertisementQueryKey';
import { queryOptions } from '@tanstack/react-query';
import { AdvertisementCategoryType } from '@type/advertisement';
import { getAdvertisementList } from '.';

export const useGetAdvertisementQueryOption = (category: AdvertisementCategoryType) => {
  return queryOptions({
    queryKey: AdvertisementQueryKey.list(category),
    queryFn: () => getAdvertisementList(category),
  });
};

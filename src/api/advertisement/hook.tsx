import AdvertisementQueryKey from '@api/advertisement/AdvertisementQueryKey';
import { useQuery } from '@tanstack/react-query';
import { AdvertisementCategoryType } from '@type/advertisement';
import { getAdvertisementList } from '.';

export const useGetAdvertisementQuery = (category: AdvertisementCategoryType) => {
  return useQuery({
    queryKey: AdvertisementQueryKey.list(category),
    queryFn: () => getAdvertisementList(category),
  });
};

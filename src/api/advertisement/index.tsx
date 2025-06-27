import { AdvertisementCategoryType, GetAdvertisementResponse } from '@api/advertisement/type';
import { api } from '..';

export const getAdvertisementList = async (category: AdvertisementCategoryType) => {
  const { data } = await api.get<GetAdvertisementResponse>(`/advertisement/v2?category=${category}`);
  return data;
};

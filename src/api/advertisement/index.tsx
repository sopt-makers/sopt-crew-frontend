import { api } from '..';
import { paths } from '@/__generated__/schema2';

type AdsResponse = paths['/advertisement/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export const getMeetingAds = async () => {
  const { data } = await api.get<AdsResponse>('/advertisement/v2?category=MEETING');
  return data;
};

export const getPostAds = async () => {
  const { data } = await api.get<AdsResponse>('/advertisement/v2?category=POST');
  return data;
};

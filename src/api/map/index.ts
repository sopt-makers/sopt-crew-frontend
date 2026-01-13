import { api } from '@api/index';
import { GetSearchSubwayResponse } from './type';

export const getSearchSubway = async (query: string) => {
  return (
    await api.get<GetSearchSubwayResponse>('/api/v2/map/search/subway', {
      params: { keyword: query },
    })
  ).data;
};

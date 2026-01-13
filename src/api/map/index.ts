import { api } from '@api/index';
import { GetSearchSubwayResponse, PostSoptMap } from './type';

export const getSearchSubway = async (query: string) => {
  return (
    await api.get<GetSearchSubwayResponse>('/api/v2/map/search/subway', {
      params: { keyword: query },
    })
  ).data;
};

export const postSoptMap = async (body: PostSoptMap['request']): Promise<PostSoptMap['response']> => {
  return (await api.post<PostSoptMap['response']>('/api/v2/map', body)).data;
};

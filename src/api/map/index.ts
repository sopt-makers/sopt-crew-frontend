import { api } from '@api/index';
import { GetMapList, GetSearchSubwayResponse, PostSoptMap } from '@api/map/type';

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

export const getMapList = async (params: GetMapList['request']) => {
  return (await api.get<GetMapList['response']>('/api/v2/map', { params })).data;
};

export const deleteMap = async (mapId: number) => {
  const { data } = await api.delete(`/api/v2/map/${mapId}`);
  return data;
};

export const putMapRecommendation = async (mapId: number) => {
  const { data } = await api.put(`/api/v2/map/toggle/recommend/${mapId}`);
  return data;
};

export const postMapEvent = async (soptMapId: number) => {
  const { data } = await api.post(`/api/v2/map/event`, {
    soptMapId,
  });
  return data;
};

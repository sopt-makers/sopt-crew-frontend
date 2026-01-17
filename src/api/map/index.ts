import { api } from '@api/index';
import {
  GetMapDetail,
  GetMapEvent,
  GetMapEventGift,
  GetMapList,
  GetSearchSubwayResponse,
  PostSoptMap,
  PutSoptMap,
} from '@api/map/type';

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

export const putSoptMap = async (body: PutSoptMap['request'], soptMapId: number): Promise<PutSoptMap['response']> => {
  return (await api.put<PutSoptMap['response']>(`/api/v2/map/${soptMapId}`, body)).data;
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

export const getMapEvent = async ({ soptMapId }: GetMapEvent['request']) => {
  const { data } = await api.get<GetMapEvent['response']>(`/api/v2/map/event/${soptMapId}`);
  return data;
};

export const getMapEventGift = async ({ soptMapId }: GetMapEventGift['request']) => {
  const { data } = await api.get<GetMapEventGift['response']>(`/api/v2/map/gift/${soptMapId}`);
  return data;
};

export const getMapDetail = async ({ soptMapId }: GetMapDetail['request']) => {
  const { data } = await api.get<GetMapDetail['response']>(`/api/v2/map/${soptMapId}`);
  return data;
};

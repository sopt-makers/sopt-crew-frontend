import { api } from '@api/index';
import { GetMapList } from '@api/map/type';

export const getMapList = async (params: GetMapList['request']) => {
  return (await api.get<GetMapList['response']>('/api/v2/map', { params })).data;
};

export const deleteMap = async (mapId: number) => {
  const { data } = await api.delete(`/api/v2/map/${mapId}`);
  return data;
};

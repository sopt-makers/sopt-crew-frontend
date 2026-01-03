import { api } from '@api/index';
import { GetMapList, GetSubwaySearch } from '@api/map/type';

export const getMapList = async () => {
  return (await api.get<GetMapList['response']>('/api/v2/map')).data;
};

export const getSubwayList = async () => {
  return (await api.get<GetSubwaySearch['response']>('/api/v2/map/search/subway')).data;
};

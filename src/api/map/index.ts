import { api } from '@api/index';
import { GetMapList } from '@api/map/type';

export const getMapList = async () => {
  return (await api.get<GetMapList['response']>('/api/v2/map')).data;
};

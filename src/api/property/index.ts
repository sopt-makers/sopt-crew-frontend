import { api } from '@api/index';

export const getProperty = async (key?: string) => {
  const { data } = await api.get(`/property/v2`, { params: { key } });
  return data.key;
};

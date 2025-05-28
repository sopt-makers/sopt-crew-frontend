import { getProperty } from '@api/property';

export const useGetPropertyQueryOption = (key?: string) => ({
  queryKey: ['property', key],
  queryFn: () => getProperty(key),
});

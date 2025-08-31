import { getProperty } from '@api/property';
import PropertyQueryKey from '@api/property/PropertyQueryKey';
import { queryOptions } from '@tanstack/react-query';

export const usePropertyQueryOption = (key?: string) => {
  return queryOptions({
    queryKey: PropertyQueryKey.detail(key),
    queryFn: () => getProperty(key),
  });
};

import { getProperty } from '@api/property';
import PropertyQueryKey from '@api/property/PropertyQueryKey';

export const usePropertyQueryOption = (key?: string) => ({
  queryKey: PropertyQueryKey.detail(key),
  queryFn: () => getProperty(key),
});

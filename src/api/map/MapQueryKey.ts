import { GetMapList } from '@api/map/type';

const MapQueryKey = {
  all: () => ['map'] as const,
  list: (params?: GetMapList['request']) => [...MapQueryKey.all(), params] as const,
};

export default MapQueryKey;

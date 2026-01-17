import { GetMapList } from '@api/map/type';

const MapQueryKey = {
  all: () => ['map'] as const,
  list: (params?: GetMapList['request']) => [...MapQueryKey.all(), params] as const,
  infiniteList: (params?: Omit<GetMapList['request'], 'page'>) =>
    [...MapQueryKey.list({ ...params, page: 1 }), 'infinite'] as const,
  searchSubway: (query: string) => ['map', 'searchSubway', query] as const,
  event: (soptMapId: number) => ['map', 'event', soptMapId] as const,
  eventGift: (soptMapId: number) => ['map', 'eventGift', soptMapId] as const,
};

export default MapQueryKey;

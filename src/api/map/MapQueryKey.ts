import { GetMapList } from '@api/map/type';

const MapQueryKey = {
  all: () => ['map'] as const,
  detail: (soptMapId: number) => [...MapQueryKey.all(), soptMapId] as const,
  list: (params?: GetMapList['request']) => [...MapQueryKey.all(), params] as const,
  infiniteList: (params?: Omit<GetMapList['request'], 'page'>) =>
    [...MapQueryKey.list({ ...params, page: 1 }), 'infinite'] as const,
  searchSubway: (query: string) => [...MapQueryKey.all(), 'searchSubway', query] as const,
  event: (soptMapId: number) => [...MapQueryKey.all(), 'event', soptMapId] as const,
  eventGift: (soptMapId: number) => [...MapQueryKey.all(), 'eventGift', soptMapId] as const,
};

export default MapQueryKey;

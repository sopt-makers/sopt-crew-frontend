import { InfiniteData } from '@tanstack/react-query';
import { GetMapList } from './type';

type MapCacheData = InfiniteData<GetMapList['response']> | GetMapList['response'];
type MapListUpdater = (mapList: GetMapList['response']['soptMaps']) => void;

export const visitMapCache = (data: MapCacheData, updater: MapListUpdater) => {
  if ('pages' in data) {
    data.pages.forEach(page => updater(page.soptMaps));
  } else if ('soptMaps' in data) {
    updater(data.soptMaps);
  }
};

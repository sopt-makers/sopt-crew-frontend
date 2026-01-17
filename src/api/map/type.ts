import { paths } from '@/__generated__/schema2';

export type GetSearchSubwayResponse =
  paths['/api/v2/map/search/subway']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type PostSoptMap = {
  request: paths['/api/v2/map']['post']['requestBody']['content']['application/json;charset=UTF-8'];
  response: paths['/api/v2/map']['post']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type GetMapList = {
  request: paths['/api/v2/map']['get']['parameters']['query'];
  response: paths['/api/v2/map']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type mapData = GetMapList['response']['soptMaps'][number];

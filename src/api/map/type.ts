import { paths } from '@/__generated__/schema2';

export type GetMapList = {
  request: paths['/api/v2/map']['get']['parameters']['query'];
  response: paths['/api/v2/map']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type GetSubwaySearch = {
  request: paths['/api/v2/map/search/subway']['get']['parameters']['query'];
  response: paths['/api/v2/map/search/subway']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

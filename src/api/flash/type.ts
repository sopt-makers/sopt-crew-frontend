import { paths } from '@/__generated__/schema2';

export type PostFlash = {
  request: paths['/flash/v2']['post']['requestBody']['content']['application/json;charset=UTF-8'];
  response: paths['/flash/v2']['post']['responses']['201']['content']['application/json;charset=UTF-8'];
};

export type GetFlash = {
  request: paths['/flash/v2/{meetingId}']['get']['parameters']['path'];
  response: paths['/flash/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type PutFlash = {
  request: paths['/flash/v2/{meetingId}']['put']['requestBody']['content']['application/json;charset=UTF-8'];
  response: paths['/flash/v2/{meetingId}']['put']['responses']['200']['content']['application/json;charset=UTF-8'];
};

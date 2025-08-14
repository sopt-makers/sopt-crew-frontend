import { paths } from '@/__generated__/schema2';

export type GetUser = paths['/user/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type GetUserApplication =
  paths['/user/v2/apply']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type GetUserInterestedKeywords =
  paths['/user/v2/interestedKeywords']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type PostUserInterestedKeywords =
  paths['/user/v2/interestedKeywords']['post']['requestBody']['content']['application/json;charset=UTF-8'];

export type GetUserMeetingList =
  paths['/user/v2/meeting']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type GetUserMeetingAll =
  paths['/user/v2/meeting/all']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type GetUserProfile =
  paths['/user/v2/profile/me']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

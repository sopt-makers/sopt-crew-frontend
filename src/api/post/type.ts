import { paths } from '@/__generated__/schema2';

export type GetPostListResponse =
  paths['/post/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type GetPostDetailResponse =
  paths['/post/v2/{postId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type PostPostResponse =
  paths['/post/v2']['post']['responses']['201']['content']['application/json;charset=UTF-8'];

export type PutPostResponse =
  paths['/post/v2/{postId}']['put']['responses']['200']['content']['application/json;charset=UTF-8'];

export type PostPostLikeResponse =
  paths['/post/v2/{postId}/like']['post']['responses']['201']['content']['application/json;charset=UTF-8'];

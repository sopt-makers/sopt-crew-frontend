import { paths } from '@/__generated__/schema2';

export type GetCommentListResponse =
  paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type PostCommentListRequest =
  paths['/comment/v2']['post']['requestBody']['content']['application/json;charset=UTF-8'];

export type GetCommentReplyResponse = GetCommentListResponse['comments'][number]['replies'][number];

export type PostCommentResponse = paths['/comment/v2']['post']['responses']['201']['content']['application/json'];

export type PostMentionRequest =
  paths['/comment/v2/mention']['post']['requestBody']['content']['application/json;charset=UTF-8'];

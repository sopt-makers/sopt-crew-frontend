import { api } from '..';
import { GetCommentListResponse, PostCommentListRequest, PostCommentResponse, PostMentionRequest } from './type';

export const getCommentList = async (postId: number) => {
  const { data } = await api.get<GetCommentListResponse>(`/comment/v2?postId=${postId}`);
  return data;
};

export const postComment = async (commentData: PostCommentListRequest) => {
  const { data } = await api.post<PostCommentResponse>(`/comment/v2`, commentData);
  return data;
};

export const putComment = async (commentId: number, contents: string) => {
  const { data } = await api.put(`/comment/v2/${commentId}`, { contents });
  return data;
};

export const deleteComment = async (commentId: number) => {
  const { data } = await api.delete(`/comment/v2/${commentId}`);
  return data;
};

export const postCommentLike = async (commentId: number) => {
  const { data } = await api.post(`/comment/v2/${commentId}/like`);
  return data;
};

export const postCommentReport = async (commentId: number) => {
  const { data } = await api.post(`/comment/v2/${commentId}/report`);
  return data;
};

export const postCommentMention = async (mentionData: PostMentionRequest) => {
  const { data } = await api.post(`/comment/v2/mention`, mentionData);
  return data;
};

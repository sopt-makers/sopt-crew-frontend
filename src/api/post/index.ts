import {
  GetPostDetailResponse,
  GetPostListResponse,
  PostPostLikeResponse,
  PostPostResponse,
  PutPostResponse,
} from '@api/post/type';
import { FormCreateType, FormEditType } from '@components/feed/Modal/feedSchema';
import { api } from '..';

export const getPostList = async (page: number, take: number, meetingId?: number) => {
  const { data } = await api.get<GetPostListResponse>('/post/v2', { params: { page, take, meetingId } });
  return data;
};

export const getPostDetail = async (postId: number) => {
  const { data } = await api.get<GetPostDetailResponse>(`/post/v2/${postId}`);
  return data;
};

export const postPost = async (formData: FormCreateType) => {
  const { data } = await api.post<PostPostResponse>('/post/v2', formData);
  return data;
};

export const putPost = async (postId: number, formData: FormEditType) => {
  const { data } = await api.put<PutPostResponse>(`/post/v2/${postId}`, formData);
  return data;
};

export const postPostLike = async (postId: number) => {
  const { data } = await api.post<PostPostLikeResponse>(`/post/v2/${postId}/like`);
  return data;
};

export const deleteComment = async (commentId: number) => {
  const { data } = await api.delete(`/comment/v2/${commentId}`);
  return data;
};

export const deletePost = async (postId: number) => {
  const { data } = await api.delete(`/post/v2/${postId}`);
  return data;
};

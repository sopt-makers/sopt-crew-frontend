import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { UserResponse } from '@api/API_LEGACY/user';
import { FormCreateType, FormEditType } from '@components/feed/Modal/feedSchema';
import { api, apiV2 } from '..';
import { paths } from '@/__generated__/schema2';

export interface PostResponse {
  id: number;
  title: string;
  contents: string;
  updatedDate: string;
  images: string[];
  viewCount: number;
  likeCount: number;
  isLiked: boolean;
  user: Pick<UserResponse, 'id' | 'name' | 'profileImage'>;
  meeting: Pick<GetMeetingResponse, 'id' | 'title' | 'imageURL' | 'category'>;
}

export const createPost = async (formData: FormCreateType) => {
  const { data } = await api.post<{ postId: number }>('/post/v2', formData);
  return data;
};

export const editPost = async (postId: string, formData: FormEditType) => {
  type editPostType =
    paths['/post/v2/{postId}']['put']['responses']['200']['content']['application/json;charset=UTF-8'];
  const { data } = await api.put<editPostType>(`/post/v2/${postId}`, formData);
  return data;
};

export const getPosts = async (page: number, take: number, meetingId?: number) => {
  const { GET } = apiV2.get();
  const { data } = await GET('/post/v2', { params: { query: { page, take, meetingId } } });
  return data;
};

export const getPost = async (postId: string) => {
  type getPostType = paths['/post/v2/{postId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
  const { data } = await api.get<getPostType>(`/post/v2/${postId}`);
  return data;
};

export const postLike = async (postId: number) => {
  type postListType =
    paths['/post/v2/{postId}/like']['post']['responses']['201']['content']['application/json;charset=UTF-8'];
  const { data } = await api.post<postListType>(`/post/v2/${postId}/like`);
  return data;
};

export const deleteComment = async (commentId: number) => {
  return (await api.delete(`/comment/v2/${commentId}`)).data;
};

export const deletePost = async (postId: number) => {
  return (await api.delete(`/post/v2/${postId}`)).data;
};

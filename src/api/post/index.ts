import { MeetingResponse } from '@api/API_LEGACY/meeting';
import { UserResponse } from '@api/API_LEGACY/user';
import { FormCreateType, FormEditType } from '@components/feed/Modal/feedSchema';
import { Data, api, apiV2 } from '..';
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
  meeting: Pick<MeetingResponse, 'id' | 'title' | 'imageURL' | 'category'>;
}

export const createPost = async (formData: FormCreateType) => {
  const { data } = await api.post<{ postId: number }>('/post/v2', formData);
  return data;
};

export const editPost = async (postId: string, formData: FormEditType) => {
  const { data } = await api.put<Data<Pick<PostResponse, 'id' | 'title' | 'contents' | 'updatedDate' | 'images'>>>(
    `/post/v1/${postId}`,
    formData
  );
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

export const postLike = async (queryId: string) => {
  const { POST } = apiV2.get();
  return await POST('/post/v1/{postId}/like', { params: { path: { postId: Number(queryId) } } });
};

export const deleteComment = async (commentId: number) => {
  return (await api.delete(`/comment/v2/${commentId}`)).data;
};

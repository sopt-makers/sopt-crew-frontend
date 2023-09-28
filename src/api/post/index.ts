import { FormType } from '@components/feed/Modal/feedSchema';
import { UserResponse } from '@api/user';
import { MeetingResponse } from '@api/meeting';
import { Data, api, apiV2 } from '..';

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

export const createPost = async (formData: FormType) => {
  const { data } = await api.post<Data<{ postId: number }>>('/post/v1', formData);
  return data;
};
export const getPosts = async (page: number, take: number, meetingId: number) => {
  const { GET } = apiV2.get();
  const { data } = await GET('/post/v1', { params: { query: { page, take, meetingId } } });
  return data;
};

export const getPost = async (postId: string) => {
  const { data } = await api.get<Data<PostResponse>>(`/post/v1/${postId}`);
  return data;
};

export const postLike = async (queryId: string) => {
  const { POST } = apiV2.get();
  return await POST('/post/v1/{postId}/like', { params: { path: { postId: Number(queryId) } } });
};

export const deleteComment = async (commentId: number) => {
  return (await api.delete(`/comment/v1/${commentId}`)).data;
};

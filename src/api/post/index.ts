import { FormType } from '@components/page/meetingDetail/Feed/Modal/schema';
import { Data, api, apiV2 } from '..';
const { GET } = apiV2.get();

export const createPost = async (formData: FormType) => {
  const { data } = await api.post<Data<{ postId: number }>>('/post/v1', formData);
  return data;
};
export const getPosts = async (page: number, take: number, meetingId: number) => {
  const { data } = await GET('/post/v1', { params: { query: { page, take, meetingId } } });
  return data;
};
export const postLike = async (queryId: string) => {
  const { POST } = apiV2.get();
  return await POST('/post/v1/{postId}/like', { params: { path: { postId: Number(queryId as string) } } });
};

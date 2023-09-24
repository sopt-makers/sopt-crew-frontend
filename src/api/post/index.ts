import { FormType } from '@components/page/meetingDetail/Feed/Modal/schema';
import { Data, api, apiV2 } from '..';

export const createPost = async (formData: FormType) => {
  const { data } = await api.post<Data<{ postId: number }>>('/post/v1', formData);
  return data;
};

export const getInfinitePosts = async ({ page = 1 }: { page?: number }, take: number, meetingId: number) => {
  const { data } = await apiV2.GET('/post/v1', { params: { query: { page, take, meetingId } } });
  return data;
};

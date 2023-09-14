import { FormType } from '@components/page/meetingDetail/Feed/Modal/schema';
import { Data, api } from '..';

export const createPost = async (formData: FormType) => {
  const { data } = await api.post<Data<{ postId: number }>>('/post/v1', formData);
  return data;
};

import { api } from '..';

type GetNoticesResponse = {
  id: number;
  title: string;
  subTitle: string;
  contents: string;
  createdDate: string;
}[];
export const getNotices = async (status = 'EXPOSING') => {
  const { data } = await api.get<GetNoticesResponse>(`/notice/v2`, { params: { status } });
  return data;
};

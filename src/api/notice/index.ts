import { api } from '..';

type GetNoticesResponse = {
  id: number;
  title: string;
  subTitle: string;
  contents: string;
  createdDate: string;
}[];
export const getNotices = async () => {
  const { data } = await api.get<GetNoticesResponse>(`/notice/v2`);
  return data;
};

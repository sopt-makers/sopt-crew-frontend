import { Data } from '..';
import { api } from '..';

type GetNoticesResponse = {
  id: number;
  title: string;
  subTitle: string;
  contents: string;
  createdDate: string;
}[];
export const getNotices = async (status = 'EXPOSING') => {
  const { data } = await api.get<Data<GetNoticesResponse>>(`/notice/v1`, { params: { status } });
  return data;
};

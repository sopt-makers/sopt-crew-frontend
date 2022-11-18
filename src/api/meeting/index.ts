import { api, PromiseResponse } from '..';
import { ApplyResponse, UserResponse } from '../user';

interface filterData {
  category: string[];
  status: string[];
  search?: string;
}
export type RecruitmentStatusType = 0 | 1 | 2;
export interface ImageURLType {
  id: string;
  url: string;
}
export interface GroupResponse {
  id: number;
  title: string;
  category: string;
  status: RecruitmentStatusType;
  imageURL: ImageURLType[];
  startDate: string;
  endDate: string;
  capacity: number;
  desc: string;
  processDesc: string;
  mStartDate: string;
  mEndDate: string;
  leaderDesc: string;
  targetDesc: string;
  note: string | null;
  appliedInfo: ApplyResponse[];
  user: UserResponse;
}

interface GroupListOfFilterResponse {
  count: number;
  meetings: GroupResponse[];
}

function parseStatusArrayToNumber(status: string[]) {
  if (
    (status.includes('모집 중') && status.includes('모집 마감')) ||
    !status.length
  )
    return 0;
  if (status.includes('모집 중')) return 1;
  if (status.includes('모집 마감')) return 2;
}

export const fetchGroupListOfAll = async ({
  category,
  status,
  search,
}: filterData) => {
  return api.get<PromiseResponse<GroupListOfFilterResponse>>(
    `/meeting?status=${parseStatusArrayToNumber(status)}${
      category?.length ? `&category=${category.join(',')}` : ''
    }${search ? `&query=${search}` : ''}`
  );
};

export const getGroup = async (id: string): Promise<GroupResponse> => {
  return (await api.get<PromiseResponse<GroupResponse>>(`/meeting/${id}`)).data
    .data;
};

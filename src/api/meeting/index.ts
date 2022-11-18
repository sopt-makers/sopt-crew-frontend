import { RECRUITMENT_STATUS } from '@constants/status';
import { api, PromiseResponse } from '..';
import { ApplyResponse, UserResponse } from '../user';

interface filterData {
  category: string[];
  status?: string[];
  search?: string;
}
export interface ImageURLType {
  id: number;
  url: string;
}
export type RecruitmentStatusType = 1 | 2 | 3;
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

function parseStatusToNumber(status: string) {
  const statusIdx = RECRUITMENT_STATUS.findIndex(item => item === status);
  if (statusIdx > 0) return statusIdx;
  return null;
}

export const fetchGroupListOfAll = async ({
  category,
  status,
  search,
}: filterData) => {
  return api.get<PromiseResponse<GroupListOfFilterResponse>>(
    `/meeting?${
      status?.length
        ? `&status=${status
            .map(item => parseStatusToNumber(item))
            .filter(item => item !== null)
            .join(',')}`
        : ''
    }${category?.length ? `&category=${category.join(',')}` : ''}${
      search ? `&query=${search}` : ''
    }`
  );
};

export const getGroup = async (id: string): Promise<GroupResponse> => {
  return (await api.get<PromiseResponse<GroupResponse>>(`/meeting/${id}`)).data
    .data;
};

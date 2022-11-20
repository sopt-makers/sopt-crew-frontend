import { RECRUITMENT_STATUS } from '@constants/status';
import { api, PromiseResponse } from '..';
import { ApplyResponse, UserResponse } from '../user';

interface PaginationType {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface filterData {
  page?: number;
  category: string[];
  status?: string[];
  search?: string;
}
interface ImageURLType {
  id: number;
  url: string;
}
export type RecruitmentStatusType = 0 | 1 | 2;
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
  meta: PaginationType;
  meetings: GroupResponse[];
}

function parseStatusToNumber(status: string) {
  const statusIdx = RECRUITMENT_STATUS.findIndex(item => item === status);
  if (statusIdx >= 0) return statusIdx;
  return null;
}

export const fetchGroupListOfAll = async ({
  page,
  category,
  status,
  search,
}: filterData) => {
  return api.get<PromiseResponse<GroupListOfFilterResponse>>(
    `/meeting?${page ? `&page=${page}` : ''}${
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

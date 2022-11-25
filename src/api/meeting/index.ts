import { RECRUITMENT_STATUS } from '@constants/status';
import { api, apiWithAuth, PromiseResponse } from '..';
import { ApplicationStatusType, ApplyResponse, UserResponse } from '../user';

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
export interface ImageURLType {
  id: number;
  url: string;
}
export type RecruitmentStatusType = 0 | 1 | 2;
export interface GroupResponse {
  id: number;
  userId: number;
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
  confirmedApply: ApplyResponse[];
  host: boolean;
  apply: boolean;
}
interface GroupListOfFilterResponse {
  meta: PaginationType;
  meetings: GroupResponse[];
}

interface OptionData {
  id: string;
  page: number;
  take: number;
  status: number;
  date: string;
}

export interface ApplicationData {
  id: number;
  appliedDate: string;
  content: string;
  status: ApplicationStatusType;
  user: UserResponse;
}

export interface GroupPeopleResponse {
  apply: ApplicationData[];
  meta: PaginationType;
}

export interface PostApplicationRequest {
  id: number;
  content?: string;
}

export interface UpdateApplicationRequest {
  id: number;
  applyId: number;
  status: number;
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

export const getGroup = async (id: string): Promise<GroupResponse> => {
  return (
    await apiWithAuth.get<PromiseResponse<GroupResponse>>(`/meeting/${id}`)
  ).data.data;
};

export const getGroupPeopleList = async ({
  id,
  ...rest
}: OptionData): Promise<GroupPeopleResponse> => {
  return (
    await apiWithAuth.get<PromiseResponse<GroupPeopleResponse>>(
      `/meeting/${id}/list`,
      {
        params: rest,
      }
    )
  ).data.data;
};

export const deleteGroup = async (
  id: number
): Promise<{ statusCode: number }> => {
  return (await apiWithAuth.delete<{ statusCode: number }>(`/meeting/${id}`))
    .data;
};

export const postApplication = async (
  body: PostApplicationRequest
): Promise<{ statusCode: number }> => {
  return (
    await apiWithAuth.post<{ statusCode: number }>(`/meeting/apply`, body)
  ).data;
};

export const updateApplication = async ({
  id,
  ...rest
}: UpdateApplicationRequest) => {
  return (await apiWithAuth.put(`/meeting/${id}/apply/status`, rest)).data;
};

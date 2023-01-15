import {
  APPROVE_STATUS,
  APPLICATION_TYPE,
  RECRUITMENT_STATUS,
} from '@constants/option';
import { api, Data, PromiseResponse } from '..';
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
  host: boolean;
  apply: boolean;
  approved: boolean;
  invite: boolean;
}
interface GroupListOfFilterResponse {
  meta: PaginationType;
  meetings: GroupResponse[];
}

interface OptionData {
  id: string;
  page: number;
  take: number;
  status: string[];
  type: string[];
  date: string;
}

export interface ApplicationData {
  id: number;
  type: number;
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

export interface UpdateInvitationRequest {
  id: number;
  applyId: number;
  status: number;
}

export interface DeleteInvitationRequest {
  id: number;
  inviteId: number;
}

function parseStatusToNumber(status: string, statusArray: string[]) {
  const statusIdx = statusArray.findIndex(item => item === status);
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
            .map(item => parseStatusToNumber(item, RECRUITMENT_STATUS))
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

export const getGroupPeopleList = async ({
  id,
  ...rest
}: OptionData): Promise<GroupPeopleResponse> => {
  const { status, type } = rest;

  return (
    await api.get<PromiseResponse<GroupPeopleResponse>>(`/meeting/${id}/list`, {
      params: {
        ...rest,
        ...(status.length && {
          status: status
            .map(item => parseStatusToNumber(item, APPROVE_STATUS))
            .filter(item => item !== null)
            .join(','),
        }),
        ...(type.length && {
          type: type
            .map(item => parseStatusToNumber(item, APPLICATION_TYPE))
            .filter(item => item !== null)
            .join(','),
        }),
      },
    })
  ).data.data;
};

export const deleteGroup = async (
  id: number
): Promise<{ statusCode: number }> => {
  return (await api.delete<{ statusCode: number }>(`/meeting/${id}`)).data;
};

export const postApplication = async (
  body: PostApplicationRequest
): Promise<{ statusCode: number }> => {
  return (await api.post<{ statusCode: number }>(`/meeting/apply`, body)).data;
};

export const updateApplication = async ({
  id,
  ...rest
}: UpdateApplicationRequest) => {
  return (await api.put(`/meeting/${id}/apply/status`, rest)).data;
};

export const updateInvitation = async ({
  id,
  ...rest
}: UpdateInvitationRequest) => {
  return (await api.put(`/meeting/${id}/invite/status`, rest)).data;
};

export const deleteInvitation = async ({
  id,
  inviteId,
}: DeleteInvitationRequest) => {
  return (await api.delete(`/meeting/${id}/invite/${inviteId}`)).data;
};

// NOTE: profileImage의 type을 override 한다
export interface UserToInvite extends Omit<UserResponse, 'profileImage'> {
  profileImage: string | null;
  hasProfile: boolean;
}
export const getUsersToInvite = async (
  groupId: string,
  generation: string | null,
  name: string
) => {
  const {
    data: { data },
  } = await api.get<Data<UserToInvite[]>>(`/meeting/${groupId}/users`, {
    params: {
      generation,
      name,
    },
  });
  return data;
};

export const invite = async (
  groupId: string,
  message: string,
  userIdArr: number[]
) => {
  const { data } = await api.post(`/meeting/invite`, {
    id: Number(groupId),
    message,
    userIdArr,
  });
  return data;
};

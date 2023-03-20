import { APPROVAL_STATUS, APPLICATION_TYPE, RECRUITMENT_STATUS } from '@constants/option';
import { Option } from '@components/form/Select/OptionItem';
import { FormType } from 'src/types/form';
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
export interface MeetingResponse {
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
  isMentorNeeded: boolean;
  canJoinOnlyActiveGeneration: boolean;
  joinableParts: string[];
  appliedInfo: ApplyResponse[];
  user: UserResponse;
  host: boolean;
  apply: boolean;
  approved: boolean;
  invite: boolean;
}
interface MeetingListOfFilterResponse {
  meta: PaginationType;
  meetings: MeetingResponse[];
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

export interface MeetingPeopleResponse {
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

export const fetchMeetingListOfAll = async ({ page, category, status, search }: filterData) => {
  return api.get<PromiseResponse<MeetingListOfFilterResponse>>(
    `/meeting?${page ? `&page=${page}` : ''}${
      status?.length
        ? `&status=${status
            .map(item => parseStatusToNumber(item, RECRUITMENT_STATUS))
            .filter(item => item !== null)
            .join(',')}`
        : ''
    }${category?.length ? `&category=${category.join(',')}` : ''}${search ? `&query=${search}` : ''}`
  );
};

export const getMeeting = async (id: string): Promise<MeetingResponse> => {
  return (await api.get<PromiseResponse<MeetingResponse>>(`/meeting/${id}`)).data.data;
};

export const getMeetingPeopleList = async ({ id, ...rest }: OptionData): Promise<MeetingPeopleResponse> => {
  const { status, type } = rest;

  return (
    await api.get<PromiseResponse<MeetingPeopleResponse>>(`/meeting/${id}/list`, {
      params: {
        ...rest,
        ...(status.length && {
          status: status
            .map(item => parseStatusToNumber(item, APPROVAL_STATUS))
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

export const deleteMeeting = async (id: number): Promise<{ statusCode: number }> => {
  return (await api.delete<{ statusCode: number }>(`/meeting/${id}`)).data;
};

export const postApplication = async (body: PostApplicationRequest): Promise<{ statusCode: number }> => {
  return (await api.post<{ statusCode: number }>(`/meeting/apply`, body)).data;
};

export const updateApplication = async ({ id, ...rest }: UpdateApplicationRequest) => {
  return (await api.put(`/meeting/${id}/apply/status`, rest)).data;
};

export const updateInvitation = async ({ id, ...rest }: UpdateInvitationRequest) => {
  return (await api.put(`/meeting/${id}/invite/status`, rest)).data;
};

export const deleteInvitation = async ({ id, inviteId }: DeleteInvitationRequest) => {
  return (await api.delete(`/meeting/${id}/invite/${inviteId}`)).data;
};

// NOTE: profileImage의 type을 override 한다
export interface UserToInvite extends Omit<UserResponse, 'profileImage'> {
  profileImage: string | null;
  hasProfile: boolean;
}
export const getUsersToInvite = async (meetingId: string, generation: string | null, name: string) => {
  const {
    data: { data },
  } = await api.get<Data<UserToInvite[]>>(`/meeting/${meetingId}/users`, {
    params: {
      generation,
      name,
    },
  });
  return data;
};

export const invite = async (meetingId: string, message: string, userIdArr: number[]) => {
  const { data } = await api.post(`/meeting/invite`, {
    id: Number(meetingId),
    message,
    userIdArr,
  });
  return data;
};

const serializeFormData = (formData: FormType) => {
  const form = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    // NOTE: category는 object 이므로 value만 가져온다.
    if (key === 'category') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      form.append(key, (value as Option).value!);
    }
    // NOTE: nested된 필드를 flat하게 만들어주자.
    else if (key === 'detail') {
      for (const [detailKey, value] of Object.entries(formData[key])) {
        if (value) {
          form.append(detailKey, value);
        }
      }
    } else if (key === 'files') {
      for (const file of formData[key] as File[]) {
        form.append('files', file);
      }
    }
    // NOTE: 다른 필드들은 그대로 주입
    else {
      form.append(key, value);
    }
  }
  return form;
};
export const createMeeting = async (formData: FormType) => {
  const { data } = await api.post<Data<number>>('/meeting', serializeFormData(formData));

  return data;
};

export const updateMeeting = async (meetingId: string, formData: FormType) => {
  const response = await api.put(`/meeting/${meetingId}`, serializeFormData(formData));

  return response;
};

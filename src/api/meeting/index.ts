import { APPROVAL_STATUS, APPLICATION_TYPE, RECRUITMENT_STATUS, PART_OPTIONS, PART_VALUES } from '@constants/option';
import { FormType } from '@type/form';
import { api, Data, PromiseResponse } from '..';
import { ApplicationStatusType, ApplyResponse, UserResponse } from '../user';
import { parseBool } from '@utils/parseBool';
import axios from 'axios';

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
  isOnlyActiveGeneration?: string | null;
  part?: string[];
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
  approvedApplyCount: number;
  capacity: number;
  desc: string;
  processDesc: string;
  mStartDate: string;
  mEndDate: string;
  leaderDesc: string;
  targetDesc: string;
  note: string | null;
  isMentorNeeded: boolean;
  appliedInfo: ApplyResponse[];
  user: UserResponse;
  host: boolean;
  apply: boolean;
  approved: boolean;
  canJoinOnlyActiveGeneration: boolean;
  targetActiveGeneration: number | null;
  joinableParts: string[];
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
  content?: string;
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

export interface GroupBrowsingCardDetail {
  id: number;
  userId: number;
  title: string;
  category: string;
  imageURL: {
    id: number;
    url: string;
  }[];
  startDate: string;
  endDate: string;
  mStartDate: string;
  mEndDate: string;
  capacity: number;
  recentActivityDate: string | null;
  targetActiveGeneration: number;
  joinableParts: ('PM' | 'DESIGN' | 'WEB' | 'ANDROID' | 'IOS' | 'SERVER')[];
  applicantCount: number;
  approvedUserCount: number;
  user: {
    id: number;
    name: string;
    orgId: number;
    profileImage: string;
  };
  status: 0 | 1 | 2;
}

function parseStatusToNumber(status: string, statusArray: string[]) {
  const statusIdx = statusArray.findIndex(item => item === status);
  if (statusIdx >= 0) return statusIdx;
  return null;
}
function parsePartLabelToValue(part: string) {
  const partIdx = PART_OPTIONS.findIndex(option => option === part);
  if (partIdx >= 0) return PART_VALUES[partIdx];
  return null;
}
export function parsePartValueToLabel(part: string) {
  const partIdx = PART_VALUES.findIndex(option => option === part);
  if (partIdx >= 0) return PART_OPTIONS[partIdx];
  return null;
}
export const fetchMeetingListOfAll = async ({
  page,
  category,
  status,
  search,
  isOnlyActiveGeneration,
  part,
}: filterData) => {
  return api.get<PromiseResponse<MeetingListOfFilterResponse>>(
    `/meeting?${page ? `&page=${page}` : ''}${
      status?.length
        ? `&status=${status
            .map(item => parseStatusToNumber(item, RECRUITMENT_STATUS))
            .filter(item => item !== null)
            .join(',')}`
        : ''
    }${
      part?.length
        ? `${part
            .map((item: string) => parsePartLabelToValue(item))
            .filter(item => item !== null)
            .map(item => `&joinableParts=${item}`)
            .join('')}`
        : ''
    }${category?.length ? `&category=${category.join(',')}` : ''}${
      search ? `&query=${search}` : ''
    }${`&isOnlyActiveGeneration=${parseBool(isOnlyActiveGeneration)}`}`
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

const serializeFormData = (formData: FormType) => {
  const refinedParts = formData.detail.joinableParts
    // NOTE: value가 null, 'all' 인 것들을 필터링한다
    .filter(part => part.value && part.value !== 'all')
    .map(part => part.value) as string[];

  const data = {
    ...formData,
    category: formData.category.value,
    desc: formData.detail.desc,
    processDesc: formData.detail.processDesc,
    mStartDate: formData.detail.mStartDate,
    mEndDate: formData.detail.mEndDate,
    leaderDesc: formData.detail.leaderDesc,
    isMentorNeeded: formData.detail.isMentorNeeded,
    canJoinOnlyActiveGeneration: formData.detail.canJoinOnlyActiveGeneration,
    joinableParts: refinedParts,
    targetDesc: formData.detail.targetDesc,
    note: formData.detail.note,
    detail: undefined,
  };
  return data;
};
export const createMeeting = async (formData: FormType) => {
  const { data } = await api.post<Data<{ meetingId: number }>>('/meeting/v1', serializeFormData(formData));

  return data;
};

export const updateMeeting = async (meetingId: string, formData: FormType) => {
  const response = await api.put(`/meeting/v1/${meetingId}`, serializeFormData(formData));

  return response;
};

interface GetPresignedUrlResponse {
  url: string;
  fields: {
    'Content-Type': string;
    key: string;
    bucket: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    Policy: string;
    'X-Amz-Signature': string;
  };
}
export const getPresignedUrl = async (contentType: string) => {
  const { data } = await api.get<Data<GetPresignedUrlResponse>>('/meeting/v1/presigned-url', {
    params: { contentType },
  });
  return data;
};
export const uploadImage = async (file: File, url: string, fields: { [key: string]: string }) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }
  formData.append('file', file);
  return await axios.post<never>(url, formData);
};

export const downloadMeetingMemberCSV = async (meetingId: string) => {
  // status를 1로 박아 놓은 이유 : 승인된 신청자만 보기 위해
  // type을 0,1로 둔 이유 : 지원, 초대 둘다 보기 위해 (지금은 초대가 없지만...)
  return await api.get<Data<{ url: string }>>(`/meeting/v1/${meetingId}/list/csv?status=1&type=0,1&order=desc`);
};

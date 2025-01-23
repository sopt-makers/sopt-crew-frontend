import { ApplicationStatusType, UserResponse } from '@api/user';
import { api } from '..';
import { APPROVAL_STATUS_KOREAN_TO_ENGLISH } from '@constants/option';
import { LighteningFormType } from '@type/form';
interface PaginationType {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface OptionData {
  id: string;
  page: number;
  take: number;
  status: string[];
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

export const getMeetingPeopleList = async ({ id, ...rest }: OptionData): Promise<MeetingPeopleResponse> => {
  const { status } = rest;

  return (
    await api.get<MeetingPeopleResponse>(`/meeting/v2/${id}/list`, {
      params: {
        ...rest,
        ...(status.length && {
          status: status
            .map(item => APPROVAL_STATUS_KOREAN_TO_ENGLISH[item])
            .filter(item => item !== null)
            .join(','),
        }),
      },
    })
  ).data;
};

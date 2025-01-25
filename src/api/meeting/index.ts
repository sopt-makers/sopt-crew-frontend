import { ApplicationStatusType, UserResponse } from '@api/user';
import { api } from '..';
import { APPROVAL_STATUS_KOREAN_TO_ENGLISH } from '@constants/option';
import { FlashFormType } from '@type/form';
import { paths } from '@/__generated__/schema2';
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

type RecommendMeetingListResponse =
  paths['/meeting/v2/recommend']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
export const getRecommendMeetingList = async ({ meetingIds = [] }: { meetingIds: number[] }) => {
  const meetingIdsParams = meetingIds.reduce((acc, id, idx) => {
    return acc + (idx === 0 ? '?' : '&') + `meetingIds=${id}`;
  }, '');
  return (await api.get<RecommendMeetingListResponse>(`/meeting/v2/recommend${meetingIdsParams}`, {})).data.meetings;
};

export const createFlash = async (formData: FlashFormType) => {
  const {
    data: { meetingId },
  } = await api.post<{ meetingId: number }>('/flash/v2', filterFlashFormData(formData));
  return meetingId;
};

const filterFlashFormData = (formData: FlashFormType) => {
  const convertedTags = formData.welcomeTags?.map(tag => {
    return tag?.value;
  });
  const convertedEndDate =
    formData.timeInfo.time.value === '당일' ? formData.timeInfo.startDate : formData.timeInfo.endDate;
  const convertedFlashPlace = formData.placeInfo.place.value === '협의 후 결정' ? null : formData.placeInfo.placeDetail;
  const data = {
    flashBody: {
      title: formData.title,
      desc: formData.desc,
      flashTimingType: formData.timeInfo.time.value,
      activityStartDate: formData.timeInfo.startDate,
      activityEndDate: convertedEndDate,
      flashPlaceType: formData.placeInfo.place.value,
      flashPlace: convertedFlashPlace,
      minimumCapacity: formData.minCapacity,
      maximumCapacity: formData.maxCapacity,
      files: formData.files,
    },
    welcomeMessageTypes: convertedTags?.length === 0 ? null : convertedTags,
  };
  return data;
};

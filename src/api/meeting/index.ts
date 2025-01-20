import { ApplicationStatusType, UserResponse } from '@api/user';
import { api } from '..';
import { APPROVAL_STATUS_KOREAN_TO_ENGLISH } from '@constants/option';
import { BungaeFormType } from '@type/form';
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

export const createBungae = async (formData: BungaeFormType) => {
  const {
    data: { lightningId },
  } = await api.post<{ lightningId: number }>('/lightning/v2', filterBungaeFormData(formData));
  return lightningId;
};

const filterBungaeFormData = (formData: BungaeFormType) => {
  const convertedTags = formData.welcomeTags?.map(tag => {
    return tag?.value;
  });
  const convertedEndDate =
    formData.timeInfo.time.value === '당일' ? formData.timeInfo.startDate : formData.timeInfo.endDate;
  const convertedLightningPlace =
    formData.placeInfo.place.value === '협의 후 결정' ? null : formData.placeInfo.placeDetail;
  const data = {
    lightningBody: {
      title: formData.title,
      desc: formData.desc,
      lightningTimingType: formData.timeInfo.time.value,
      activityStartDate: formData.timeInfo.startDate,
      activityEndDate: convertedEndDate,
      lightningPlaceType: formData.placeInfo.place.value,
      lightningPlace: convertedLightningPlace,
      minimumCapacity: formData.minCapacity,
      maximumCapacity: formData.maxCapacity,
      files: formData.files,
    },
    welcomeMessageTypes: convertedTags?.length === 0 ? null : convertedTags,
  };
  return data;
};

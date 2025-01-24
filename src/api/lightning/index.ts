import { paths } from '@/__generated__/schema2';
import { api } from '@api/index';
import { LightningFormType } from '@type/form';

export const createLightning = async (formData: LightningFormType) => {
  const {
    data: { meetingId },
  } = await api.post<{ meetingId: number }>('/lightning/v2', filterLightningFormData(formData));
  return meetingId;
};

const filterLightningFormData = (formData: LightningFormType) => {
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

export type GetLightningByIdResponse =
  paths['/lightning/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export const getLightningById = async (meetingId: number): Promise<GetLightningByIdResponse> => {
  return (await api.get<GetLightningByIdResponse>(`/lightning/v2/${meetingId}`)).data;
};

export type GetLightningListRequest = paths['/meeting/v2']['get']['parameters']['query'];
export type GetMeetingListResponse =
  paths['/meeting/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
export const getLightningList = async () => {
  const params = {
    page: 1,
    take: 12,
    category: '번쩍',
    joinableParts: ['PM', 'DESIGN', 'IOS', 'ANDROID', 'SERVER', 'WEB'].join(','),
    isOnlyActiveGeneration: false,
  };
  return (await api.get<GetMeetingListResponse>('/meeting/v2', { params })).data;
};

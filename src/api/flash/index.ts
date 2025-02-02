import { paths } from '@/__generated__/schema2';
import { api } from '@api/index';
import { FlashFormType } from '@type/form';

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
      minimumCapacity: formData.capacityInfo.minCapacity,
      maximumCapacity: formData.capacityInfo.maxCapacity,
      files: formData.files,
    },
    welcomeMessageTypes: convertedTags?.length === 0 ? null : convertedTags,
  };
  return data;
};

export type GetFlashByIdResponse =
  paths['/flash/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export const getFlashById = async (meetingId: number): Promise<GetFlashByIdResponse> => {
  return (await api.get<GetFlashByIdResponse>(`/flash/v2/${meetingId}`)).data;
};

export type GetFlashListRequest = paths['/meeting/v2']['get']['parameters']['query'];
export type GetMeetingListResponse =
  paths['/meeting/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
export const getFlashList = async () => {
  const params = {
    page: 1,
    take: 12,
    category: '번쩍',
    joinableParts: ['PM', 'DESIGN', 'IOS', 'ANDROID', 'SERVER', 'WEB'].join(','),
    isOnlyActiveGeneration: false,
  };
  return (await api.get<GetMeetingListResponse>('/meeting/v2', { params })).data;
};

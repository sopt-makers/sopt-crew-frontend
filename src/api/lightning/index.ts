import { api } from '@api/index';
import { LighteningFormType } from '@type/form';

export const createLightening = async (formData: LighteningFormType) => {
  const {
    data: { lightningId },
  } = await api.post<{ lightningId: number }>('/lightning/v2', filterLighteningFormData(formData));
  return lightningId;
};

const filterLighteningFormData = (formData: LighteningFormType) => {
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

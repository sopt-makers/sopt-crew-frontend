import { PutFlash } from '@api/flash/type';
import { FlashFormType } from '@type/form';

export const serializeFlashFormData = (formData: FlashFormType): PutFlash['request'] => {
  const convertedEndDate =
    formData.timeInfo.time.value === '당일' ? formData.timeInfo.dateRange[0] : formData.timeInfo.dateRange[1];
  const convertedFlashPlace = formData.placeInfo.place.value === '협의 후 결정' ? null : formData.placeInfo.placeDetail;
  return {
    flashBody: {
      title: formData.title,
      desc: formData.desc,
      flashTimingType: formData.timeInfo.time.value,
      activityStartDate: formData.timeInfo.dateRange[0] ?? '',
      activityEndDate: convertedEndDate ?? '',
      flashPlaceType: formData.placeInfo.place.value,
      flashPlace: convertedFlashPlace ?? '',
      minimumCapacity: formData.capacityInfo.minCapacity,
      maximumCapacity: formData.capacityInfo.maxCapacity,
      files: formData.files,
    },
    meetingKeywordTypes: formData.meetingKeywordTypes,
    welcomeMessageTypes: formData.welcomeMessageTypes ?? [],
  };
};

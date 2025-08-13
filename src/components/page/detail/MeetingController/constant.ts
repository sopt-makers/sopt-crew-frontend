import { GetFlashByIdResponse } from '@api/flash';
import { GetMeeting } from '@api/meeting/type';

export const CAPACITY = (detailData: GetMeeting['response'] | GetFlashByIdResponse) => {
  if ('capacity' in detailData) {
    return `${detailData.approvedApplyCount}/${detailData.capacity}명`;
  }
  return `${detailData.approvedApplyCount}/${detailData.minimumCapacity}~${detailData.maximumCapacity}명`;
};

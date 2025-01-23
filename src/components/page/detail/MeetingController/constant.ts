import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { GetLightningByIdResponse } from '@api/lightning';

export const CAPACITY = (detailData: GetMeetingResponse | GetLightningByIdResponse) => {
  if ('capacity' in detailData) {
    return `${detailData.approvedApplyCount}/${detailData.capacity}명`;
  }
  return `${detailData.approvedApplyCount}/${detailData.minimumCapacity}~${detailData.maximumCapacity}명`;
};

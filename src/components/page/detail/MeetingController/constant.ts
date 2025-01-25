import { GetMeetingResponse } from '@api/API_LEGACY/meeting';
import { GetFlashByIdResponse } from '@api/flash';

export const CAPACITY = (detailData: GetMeetingResponse | GetFlashByIdResponse) => {
  if ('capacity' in detailData) {
    return `${detailData.approvedApplyCount}/${detailData.capacity}명`;
  }
  return `${detailData.approvedApplyCount}/${detailData.minimumCapacity}~${detailData.maximumCapacity}명`;
};

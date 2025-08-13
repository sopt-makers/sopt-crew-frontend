import { GetFlash } from '@api/flash/type';
import { GetMeeting } from '@api/meeting/type';

export const CAPACITY = (detailData: GetMeeting['response'] | GetFlash['response']) => {
  if ('capacity' in detailData) {
    return `${detailData.approvedApplyCount}/${detailData.capacity}명`;
  }
  return `${detailData.approvedApplyCount}/${detailData.minimumCapacity}~${detailData.maximumCapacity}명`;
};

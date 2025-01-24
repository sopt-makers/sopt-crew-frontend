import { GetMeetingResponse, MeetingListOfFilterResponse, parsePartValueToLabel } from '@api/API_LEGACY/meeting';
import { GetLightningByIdResponse } from '@api/lightning';
import dayjs from 'dayjs';

export const MeetingInformation = (meetingData: MeetingListOfFilterResponse['meetings'][0]) => [
  {
    label: '활동 기간',
    value: () =>
      `${dayjs(meetingData.mStartDate).format('YY.MM.DD')} - ${dayjs(meetingData.mEndDate).format('YY.MM.DD')}`,
  },
  {
    label: '모집 대상',
    value: () => {
      const isAllParts = meetingData.joinableParts?.length === 6 || meetingData.joinableParts === null;
      const part = isAllParts
        ? '전체 파트'
        : meetingData.joinableParts
          .map(part => parsePartValueToLabel(part))
          .filter(item => item !== null)
          .join(',');
      return `${meetingData.targetActiveGeneration ? `${meetingData.targetActiveGeneration}기` : '전체 기수'
        } / ${part}`;
    },
  },
  {
    label: '모집 현황',
    value: () => `${meetingData.approvedCount}/${meetingData.capacity}명`,
  },
];

export const LightningInformation = (lightningData: GetLightningByIdResponse) => [
  {
    label: '진행 일자',
    value: () => {
      const startDate = dayjs(lightningData.activityStartDate).format('YY.MM.dd');
      const endDate = dayjs(lightningData.activityEndDate).format('YY.MM.dd');

      if (lightningData.timingType === '당일') return startDate;

      return `${startDate} - ${endDate} / 협의 후 결정`;
    },
  },
  {
    label: '활동 장소',
    value: () => lightningData.place,
  },
  {
    label: '모집 현황',
    value: () => `${lightningData.minimumCapacity} ~ ${lightningData.maximumCapacity} / `,
  },
];

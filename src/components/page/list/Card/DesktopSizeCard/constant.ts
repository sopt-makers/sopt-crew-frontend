import { GetFlash } from '@api/flash/type';
import { MeetingData } from '@api/meeting/type';
import { PART_OPTIONS, PART_VALUES } from '@constants/option';
import dayjs from 'dayjs';

const parsePartValueToLabel = (part: string) => {
  const partIdx = PART_VALUES.findIndex(option => option === part);
  if (partIdx >= 0) return PART_OPTIONS[partIdx];
  return null;
};

export const MeetingInformation = (
  meetingData: MeetingData
): { label: string; value: () => string; isValid: boolean }[] => [
  {
    label: '모집 기간',
    value: () =>
      `${dayjs(meetingData.startDate).format('YY.MM.DD')} - ${dayjs(meetingData.endDate).format('YY.MM.DD')}`,
    isValid: !!(meetingData.startDate && meetingData.endDate),
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
      return `${
        meetingData.targetActiveGeneration ? `${meetingData.targetActiveGeneration}기` : '전체 기수'
      } / ${part}`;
    },
    isValid: !!(meetingData.targetActiveGeneration || meetingData.joinableParts),
  },
  {
    label: '환영 태그',
    value: () => meetingData.welcomeMessageTypes?.map(message => `#${message}`).join(' '),
    isValid: !!meetingData.welcomeMessageTypes?.length,
  },
];

export const FlashInformation = (
  flashData: GetFlash['response']
): { label: string; value: () => string; isValid: boolean }[] => [
  {
    label: '진행 일자',
    value: () => {
      const startDate = dayjs(flashData.activityStartDate).format('YY.MM.DD');
      const endDate = dayjs(flashData.activityEndDate).format('YY.MM.DD');

      if (flashData.flashTimingType === '당일') return startDate;

      return `${startDate} - ${endDate} / 협의 후 결정`;
    },
    isValid: !!(flashData.activityStartDate && flashData.activityEndDate),
  },
  {
    label: '활동 장소',
    value: () => flashData.flashPlace ?? '협의 후 결정',
    isValid: !!flashData.flashPlace,
  },
  {
    label: '환영 태그',
    value: () => flashData.welcomeMessageTypes?.map(message => `#${message}`).join(' '),
    isValid: !!flashData.welcomeMessageTypes?.length,
  },
];

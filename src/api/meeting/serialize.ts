import { parseStatusToNumber } from '@api/meeting/util';
import { APPROVAL_STATUS, APPROVAL_STATUS_KOREAN_TO_ENGLISH } from '@constants/option';
import { FormType } from '@type/form';
import { GetMeetingMemberList, PostMeeting } from './type';

export const serializeMeetingMemberListParams = (
  params: GetMeetingMemberList['request']
): GetMeetingMemberList['request'] => {
  const status = params?.status
    ?.split(',')
    .map(item => APPROVAL_STATUS_KOREAN_TO_ENGLISH[item])
    .filter((item): item is string => item !== null && item !== undefined)
    .map(item => parseStatusToNumber(item, APPROVAL_STATUS))
    .filter(item => item !== null)
    .join(',');

  return {
    ...params,
    status,
  };
};

export const serializeMeetingData = (formData: FormType): PostMeeting['request'] => {
  const refinedParts = formData.detail.joinableParts
    // NOTE: value가 null, 'all' 인 것들을 필터링한다
    .filter(part => part.value && part.value !== 'all')
    .map(part => part.value) as ('PM' | 'DESIGN' | 'IOS' | 'ANDROID' | 'SERVER' | 'WEB')[];

  return {
    title: formData.title,
    files: formData.files,
    category: formData.category.value,
    startDate: formData.dateRange[0] ?? '',
    endDate: formData.dateRange[1] ?? '',
    capacity: formData.capacity,
    desc: formData.detail.desc,
    processDesc: formData.detail.processDesc,
    mStartDate: formData.detail.mDateRange[0] ?? '',
    mEndDate: formData.detail.mDateRange[1] ?? '',
    leaderDesc: formData.detail.leaderDesc ?? '',
    note: formData.detail.note ?? '',
    isMentorNeeded: formData.detail.isMentorNeeded ?? false,
    canJoinOnlyActiveGeneration: formData.detail.canJoinOnlyActiveGeneration ?? false,
    joinableParts: refinedParts,
    coLeaderUserIds: formData.detail.coLeader?.map(user => user.userId) ?? [],
    welcomeMessageTypes: formData.welcomeMessageTypes === null ? undefined : formData.welcomeMessageTypes,
    meetingKeywordTypes: formData.meetingKeywordTypes === null ? undefined : formData.meetingKeywordTypes,
  };
};

import { FormType } from '@type/form';
import { PostMeeting } from './type';

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
    // TODO: @진혁 - 스키마 수정되면 제거 필요
    processDesc: '',
    mStartDate: '',
    mEndDate: '',
    leaderDesc: formData.detail.leaderDesc ?? '',
    note: '',
    isMentorNeeded: formData.detail.isMentorNeeded ?? false,
    canJoinOnlyActiveGeneration: formData.detail.canJoinOnlyActiveGeneration ?? false,
    joinableParts: refinedParts,
    coLeaderUserIds: formData.detail.coLeader?.map(user => user.userId) ?? [],
    welcomeMessageTypes: formData.welcomeMessageTypes === null ? undefined : formData.welcomeMessageTypes,
    meetingKeywordTypes: formData.meetingKeywordTypes === null ? undefined : formData.meetingKeywordTypes,
  };
};

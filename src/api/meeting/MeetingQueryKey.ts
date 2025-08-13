import { GetMeetingList, GetMeetingMemberList } from '@api/meeting/type';

const MeetingQueryKey = {
  all: () => ['meeting'] as const,
  list: (params: GetMeetingList['request']) => [...MeetingQueryKey.all(), params] as const,
  detail: (meetingId: number) => [...MeetingQueryKey.all(), meetingId] as const,
  memberList: (params?: GetMeetingMemberList['request']) => [...MeetingQueryKey.all(), 'peopleList', params] as const,
  recommendList: (meetingIds: number[]) => [...MeetingQueryKey.all(), 'recommendList', meetingIds] as const,
};

export default MeetingQueryKey;

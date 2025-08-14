const UserQueryKey = {
  all: () => ['user'],
  application: () => [...UserQueryKey.all(), 'application'],
  list: () => [...UserQueryKey.all(), 'list'],
  interestedKeywords: () => [...UserQueryKey.all(), 'interestedKeywords'],
  meetingList: () => [...UserQueryKey.all(), 'meetingList'],
  meetingAll: () => [...UserQueryKey.all(), 'meetingAll'],
  profile: () => [...UserQueryKey.all(), 'profile'],
};

export default UserQueryKey;

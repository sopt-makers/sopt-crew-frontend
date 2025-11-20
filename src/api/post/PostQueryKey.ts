const PostQueryKey = {
  all: () => ['post'] as const,
  list: (meetingId?: number) => [...PostQueryKey.all(), meetingId] as const,
  infiniteList: (take: number, meetingId?: number) => [...PostQueryKey.all(), take, meetingId, 'infinite'] as const,
  detail: (id: number) => [...PostQueryKey.all(), id] as const,
  count: (meetingId: number) => [...PostQueryKey.list(meetingId), 'count'] as const,
};

export default PostQueryKey;

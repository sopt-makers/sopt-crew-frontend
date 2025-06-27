const PostQueryKey = {
  all: () => ['post'] as const,
  list: (take: number, meetingId?: number) => [...PostQueryKey.all(), take, meetingId] as const,
  detail: (id: number) => [...PostQueryKey.all(), id] as const,
  count: (meetingId: number) => [...PostQueryKey.list(meetingId), 'count'] as const,
  mutate: (queryId: string) => [...PostQueryKey.all(), queryId] as const,
};

export default PostQueryKey;

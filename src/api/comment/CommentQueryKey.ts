const CommentQueryKey = {
  all: () => ['comment'] as const,
  list: (postId: number) => [...CommentQueryKey.all(), postId] as const,
};

export default CommentQueryKey;

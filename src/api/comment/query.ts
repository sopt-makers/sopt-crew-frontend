import { getCommentList } from '@api/comment';
import CommentQueryKey from '@api/comment/CommentQueryKey';
import { queryOptions } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useGetCommentQueryOption() {
  const { query } = useRouter();
  const postId = Number(query.id);

  return queryOptions({
    queryKey: CommentQueryKey.list(postId),
    queryFn: () => getCommentList(postId),
    enabled: !!query.id,
  });
}

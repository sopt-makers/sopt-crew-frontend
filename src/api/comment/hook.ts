import { getCommentList } from '@api/comment';
import CommentQueryKey from '@api/comment/CommentQueryKey';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useGetCommentQuery() {
  const { query } = useRouter();
  const postId = Number(query.id);

  const commentQuery = useQuery({
    queryKey: CommentQueryKey.list(postId),
    queryFn: () => getCommentList(postId),
    enabled: !!query.id,
  });

  return commentQuery;
}

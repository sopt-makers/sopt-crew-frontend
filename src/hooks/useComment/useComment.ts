import { apiV2 } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function useComment() {
  const { query } = useRouter();
  const { GET } = apiV2.get();

  const commentQuery = useQuery({
    queryKey: ['/comment/v2', query.id],
    queryFn: () =>
      GET('/comment/v2', {
        params: { query: { postId: Number(query.id as string) } },
      }),

    enabled: !!query.id,
  });

  return commentQuery;
}

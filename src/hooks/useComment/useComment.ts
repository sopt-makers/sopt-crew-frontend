import { apiV2 } from '@api/index';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function useComment() {
  const { query } = useRouter();
  const { GET } = apiV2.get();

  const commentQuery = useInfiniteQuery({
    queryKey: ['/comment/v1', query.id],
    queryFn: ({ pageParam = 1 }) =>
      GET('/comment/v1', { params: { query: { postId: Number(query.id as string), page: pageParam } } }),
    getNextPageParam: lastPage => {
      if (!lastPage.data?.data?.meta.hasNextPage) return;
      return (lastPage.data.data.meta.page as number) + 1;
    },
    getPreviousPageParam: firstPage => {
      if (!firstPage.data?.data?.meta.hasPreviousPage) return;
      return (firstPage.data.data.meta.page as number) - 1;
    },
    enabled: !!query.id,
  });

  return commentQuery;
}

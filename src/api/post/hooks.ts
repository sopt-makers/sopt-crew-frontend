import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '.';

export const useInfinitePosts = (take: number, meetingId: number) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['getPosts', take, meetingId],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam, take, meetingId),
    getNextPageParam: (lastPage, allPages) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const posts = lastPage?.data?.posts;
      if (!posts || posts.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: !!meetingId,
    select: data => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pages: data.pages.flatMap(page => page?.data?.posts),
      pageParams: data.pageParams,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      total: data.pages[0]?.data.meta.itemCount,
    }),
  });

  return { data, hasNextPage, fetchNextPage, isFetchingNextPage };
};

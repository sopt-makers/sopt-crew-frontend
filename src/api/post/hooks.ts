import { useInfiniteQuery } from '@tanstack/react-query';
import { getInfinitePosts } from '.';

export const useInfinitePosts = (take: number, meetingId: number) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getInfinitePosts', take, meetingId],
    queryFn: ({ pageParam = 1 }) => getInfinitePosts(pageParam, take, meetingId),
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
    }),
  });

  return { data, hasNextPage, fetchNextPage };
};

import { useInfiniteQuery } from '@tanstack/react-query';
import { getInfinitePosts } from '.';

export const useInfinitePosts = (take: number, meetingId: number) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getInfiniteFeeds', take, meetingId],
    queryFn: ({ pageParam }) => getInfinitePosts(pageParam ?? 1, take, meetingId),
    getNextPageParam: (lastPage, allPages) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return lastPage?.data?.posts?.length === 0 ? undefined : allPages.length + 1;
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

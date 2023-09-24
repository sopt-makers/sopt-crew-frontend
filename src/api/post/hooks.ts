import { useInfiniteQuery } from '@tanstack/react-query';
import { getInfinitePosts } from '.';

export const useInfinitePosts = (take: number, meetingId: number) => {
  const { data } = useInfiniteQuery({
    queryKey: ['getInfiniteFeeds', take, meetingId],
    queryFn: ({ pageParam = 1 }) => getInfinitePosts(pageParam, take, meetingId),
    getNextPageParam: lastPage => lastPage?.meta?.hasNextPage ?? undefined,
    enabled: !!meetingId,
    select: data => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pages: data.pages.flatMap(page => page?.data?.posts),
      pageParams: data.pageParams,
    }),
  });

  return { data };
};

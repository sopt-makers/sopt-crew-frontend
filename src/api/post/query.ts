import PostQueryKey from '@api/post/PostQueryKey';
import { queryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { getPostDetail, getPostList } from '.';

export const useGetPostListInfiniteQuery = (take: number, meetingId?: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: PostQueryKey.list(take, meetingId),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPostList(pageParam, take, meetingId),
    getNextPageParam: (lastPage, allPages) => {
      const posts = lastPage?.posts;
      if (!posts || posts.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: enabled,
    select: data => {
      return {
        pages: data.pages.flatMap(page => page?.posts),
        pageParams: data.pageParams,
        total: data.pages[0]?.meta.itemCount,
      };
    },
  });
};

export const useGetPostDetailQueryOption = (postId: string) => {
  return queryOptions({
    queryKey: PostQueryKey.detail(+postId),
    queryFn: () => getPostDetail(+postId),
    select: res => res,
    enabled: !!postId,
  });
};

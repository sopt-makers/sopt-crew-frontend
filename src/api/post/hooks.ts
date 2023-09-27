import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '.';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLike } from '.';
import { produce } from 'immer';
import { paths } from '@/__generated__/schema';

export const useInfinitePosts = (take: number, meetingId: number) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
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
    }),
  });

  return { data, hasNextPage, fetchNextPage };
};

type postType = {
  data: {
    data: paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json'];
  };
};

export const useMutationPostLike = (queryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['postLike'],
    mutationFn: () => postLike(queryId),
    onMutate: async () => {
      const previousPost = queryClient.getQueryData(['post', queryId]) as postType;

      const newLikeCount = previousPost.data.data.isLiked
        ? previousPost.data.data.likeCount - 1
        : previousPost.data.data.likeCount + 1;

      const data = produce(previousPost, (draft: postType) => {
        draft.data.data.isLiked = !previousPost.data.data.isLiked;
        draft.data.data.likeCount = newLikeCount;
      });

      queryClient.setQueryData(['post', queryId], data);
    },
  });
};

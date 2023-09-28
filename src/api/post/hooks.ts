import { postLike } from '.';
import { produce } from 'immer';
import { paths } from '@/__generated__/schema';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, getPosts } from '.';

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

type postType = {
  data: {
    data: paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json'];
  };
};

export const useMutationPostLike = (queryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['/post/v1/{postId}', queryId],
    mutationFn: () => postLike(queryId),
    onMutate: async () => {
      const previousPost = queryClient.getQueryData(['/post/v1/{postId}', queryId]) as postType;

      const newLikeCount = previousPost.data.data.isLiked
        ? previousPost.data.data.likeCount - 1
        : previousPost.data.data.likeCount + 1;

      const data = produce(previousPost, (draft: postType) => {
        draft.data.data.isLiked = !previousPost.data.data.isLiked;
        draft.data.data.likeCount = newLikeCount;
      });

      queryClient.setQueryData(['/post/v1/{postId}', queryId], data);
    },
  });
};

export const useDeleteComment = (commentId: number, queryId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteComment', commentId],
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/comment/v1', queryId] });
    },
  });
};

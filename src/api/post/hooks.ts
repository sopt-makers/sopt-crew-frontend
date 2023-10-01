import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPost, deleteComment, getPosts, PageResponse } from '.';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLike } from '.';
import { produce } from 'immer';
import { paths } from '@/__generated__/schema';

export const useInfinitePosts = (take: number, meetingId: number) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['getPosts', take, meetingId],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam, take, meetingId),
    getNextPageParam: (lastPage, allPages) => {
      const posts = lastPage?.data?.posts;
      if (!posts || posts.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: !!meetingId,
    select: data => ({
      pages: data.pages.flatMap(page => page?.data?.posts),
      pageParams: data.pageParams,
      total: data.pages[0]?.data.meta.itemCount,
    }),
  });

  return { data, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export const useMutationUpdateLike = (take: number, meetingId: number, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLike(String(postId)),
    onMutate: async () => {
      await queryClient.cancelQueries(['getPosts', take, meetingId]);

      const page = queryClient.getQueryData<PageResponse>(['getPosts', take, meetingId]);

      if (page?.data?.posts) {
        const currentPostIndex = page.data.posts.findIndex(post => post.id === postId);

        if (currentPostIndex !== -1) {
          const updatedPage = { ...page };
          updatedPage.data.posts[currentPostIndex] = {
            ...updatedPage.data.posts[currentPostIndex],
            likeCount: updatedPage.data.posts[currentPostIndex].isLiked
              ? updatedPage.data.posts[currentPostIndex].likeCount - 1
              : updatedPage.data.posts[currentPostIndex].likeCount + 1,
            isLiked: !updatedPage.data.posts[currentPostIndex].isLiked,
          };

          queryClient.setQueryData(['getPosts', take, meetingId], updatedPage);
        }

        return { previousPage: page };
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
    },
  });
};

export const useQueryGetPost = (postId: string) => {
  return useQuery({
    queryKey: ['getPost', postId],
    queryFn: () => getPost(postId),
    select: res => res?.data,
    enabled: !!postId,
  });
};

type postType = {
  data: paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json']['data'];
};

export const useMutationPostLike = (queryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['getPost', queryId],
    mutationFn: () => postLike(queryId),
    onMutate: async () => {
      const previousPost = queryClient.getQueryData(['getPost', queryId]) as postType;

      const newLikeCount = previousPost.data.isLiked
        ? previousPost.data.likeCount - 1
        : previousPost.data.likeCount + 1;

      const data = produce(previousPost, (draft: postType) => {
        draft.data.isLiked = !previousPost.data.isLiked;
        draft.data.likeCount = newLikeCount;
      });

      queryClient.setQueryData(['getPost', queryId], data);
    },
  });
};

export const useDeleteComment = (queryId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/comment/v1', queryId] });
    },
  });
};

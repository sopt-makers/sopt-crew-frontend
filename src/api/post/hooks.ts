import PostQueryKey from '@api/post/PostQueryKey';
import { GetPostDetailResponse, GetPostListResponse } from '@api/post/type';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { deleteComment, deletePost, getPostDetail, getPostList, postPostLike } from '.';

export const useGetPostListInfiniteQuery = (take: number, meetingId?: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: PostQueryKey.list(take, meetingId),
    queryFn: ({ pageParam = 1 }) => getPostList(pageParam, take, meetingId),
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

export const useGetPostDetailQuery = (postId: string) => {
  return useQuery({
    queryKey: PostQueryKey.detail(+postId),
    queryFn: () => getPostDetail(+postId),
    select: res => res,
    enabled: !!postId,
  });
};

export const useMutationDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(PostQueryKey.all());
    },
  });
};

export const useMutationUpdateLike = (take: number, meetingId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postPostLike(postId),
    onMutate: async postId => {
      await queryClient.cancelQueries(PostQueryKey.list(take, meetingId));

      const previousPosts = queryClient.getQueryData(PostQueryKey.list(take, meetingId));

      queryClient.setQueryData<InfiniteData<{ posts: GetPostListResponse['posts'] }>>(
        PostQueryKey.list(take, meetingId),
        oldData => {
          const newData = produce(oldData, draft => {
            draft?.pages.forEach(page => {
              page.posts.forEach((post: { id: number; likeCount: number; isLiked: boolean }) => {
                if (post.id === postId) {
                  post.likeCount = post.isLiked ? post.likeCount - 1 : post.likeCount + 1;
                  post.isLiked = !post.isLiked;
                }
              });
            });
          });
          return newData;
        }
      );
      return { previousPosts };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(PostQueryKey.list(take, meetingId), context?.previousPosts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(PostQueryKey.all());
    },
  });
};

export const useMutationPostLike = (queryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PostQueryKey.mutate(queryId),
    mutationFn: () => postPostLike(+queryId),
    onMutate: async () => {
      const previousPost = queryClient.getQueryData(PostQueryKey.mutate(queryId)) as GetPostDetailResponse;

      const newLikeCount = previousPost.isLiked ? previousPost.likeCount - 1 : previousPost.likeCount + 1;

      const data = produce(previousPost, (draft: GetPostDetailResponse) => {
        draft.isLiked = !previousPost.isLiked;
        draft.likeCount = newLikeCount;
      });

      queryClient.setQueryData(PostQueryKey.mutate(queryId), data);
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

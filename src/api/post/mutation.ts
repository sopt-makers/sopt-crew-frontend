import PostQueryKey from '@api/post/PostQueryKey';
import { GetPostDetailResponse, GetPostListResponse } from '@api/post/type';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { deletePost, postPostLike } from '.';

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PostQueryKey.all() });
    },
  });
};

export const useUpdatePostLikeMutation = (take: number, meetingId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postPostLike(postId),
    onMutate: async postId => {
      await queryClient.cancelQueries({ queryKey: PostQueryKey.list(take, meetingId) });

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
      queryClient.invalidateQueries({ queryKey: PostQueryKey.all() });
    },
  });
};

export const usePostLikeMutation = (queryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postPostLike(+queryId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: PostQueryKey.detail(+queryId) });

      const previousPost = queryClient.getQueryData<GetPostDetailResponse>(PostQueryKey.detail(+queryId));

      if (!previousPost) {
        return { previousPost: null };
      }

      queryClient.setQueryData(PostQueryKey.detail(+queryId), (oldData: GetPostDetailResponse) => {
        return produce(oldData, draft => {
          draft.isLiked = !oldData.isLiked;
          draft.likeCount = oldData.isLiked ? oldData.likeCount - 1 : oldData.likeCount + 1;
        });
      });

      return { previousPost };
    },

    onError: (err, _, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(PostQueryKey.detail(+queryId), context?.previousPost);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PostQueryKey.detail(+queryId) });
    },
  });
};

// import { paths } from '@/__generated__/schema';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { deleteComment, getPost, getPosts, postLike } from '.';
import { paths } from '@/__generated__/schema2';

export const useInfinitePosts = (take: number, meetingId?: number, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: ['getPosts', take, meetingId],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam, take, meetingId),
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

export const useMutationUpdateLike = (take: number, meetingId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postLike(String(postId)),
    onMutate: async postId => {
      await queryClient.cancelQueries(['getPosts', take, meetingId]);

      type Post = paths['/post/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['posts'];
      const previousPosts = queryClient.getQueryData(['getPosts', take, meetingId]);

      queryClient.setQueryData<InfiniteData<{ posts: Post }>>(['getPosts', take, meetingId], oldData => {
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
      });
      return { previousPosts };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['getPosts', take, meetingId], context?.previousPosts);
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
    select: res => res,
    enabled: !!postId,
  });
};

type postType = {
  data: paths['/post/v2/{postId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export const useMutationPostLike = (queryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['getPost', queryId],
    mutationFn: () => postLike(queryId),
    onMutate: async () => {
      const previousPost = queryClient.getQueryData(['getPost', queryId]) as postType;

      const newLikeCount = previousPost.data.isLiked
        ? previousPost.data.likeCount && previousPost.data.likeCount - 1
        : previousPost.data.likeCount && previousPost.data.likeCount + 1;

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

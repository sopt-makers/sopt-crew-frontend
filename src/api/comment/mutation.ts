import { deleteComment, postComment, postCommentLike, postCommentReport, putComment } from '@api/comment';
import CommentQueryKey from '@api/comment/CommentQueryKey';
import { GetCommentListResponse, PostCommentListRequest } from '@api/comment/type';
import { useToast } from '@sopt-makers/ui';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useRouter } from 'next/router';

export function usePostCommentMutation() {
  return useMutation({
    mutationKey: ['/comment/v1'],
    mutationFn: (commentData: PostCommentListRequest) => postComment(commentData),
  });
}

export function usePutCommentMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, contents }: { commentId: number; contents: string }) => putComment(commentId, contents),
    onSuccess: () => queryClient.invalidateQueries(CommentQueryKey.list(postId)),
  });
}
export function usePostCommentLikeMutation() {
  const queryClient = useQueryClient();
  const { query } = useRouter();

  return useMutation({
    mutationKey: ['/comment/v1/{commentId}/like'],
    mutationFn: (commentId: number) => postCommentLike(commentId),
    onMutate: async commentId => {
      await queryClient.cancelQueries({ queryKey: CommentQueryKey.list(Number(query.id)) });

      const previousComments = queryClient.getQueryData(CommentQueryKey.list(Number(query.id)));

      type Comments = GetCommentListResponse['comments'];
      queryClient.setQueryData<InfiniteData<{ comments: Comments }>>(
        CommentQueryKey.list(Number(query.id)),
        oldData => {
          const newData = produce(oldData, draft => {
            //todo: pages 제거 작업 필요
            draft?.pages?.forEach(page => {
              page.comments.forEach(comment => {
                if (comment.id === commentId) {
                  comment.isLiked = !comment.isLiked;
                  comment.likeCount = comment.isLiked ? comment.likeCount + 1 : comment.likeCount - 1;
                }
              });
            });
          });
          return newData;
        }
      );
      return { previousComments };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(CommentQueryKey.list(Number(query.id)), context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CommentQueryKey.list(Number(query.id)) });
    },
  });
}

export function usePostCommentReportMutation() {
  const { open } = useToast();

  return useMutation({
    mutationKey: ['/comment/v1/{commentId}/report'],
    mutationFn: (commentId: number) => postCommentReport(commentId),
    onSuccess: () => {
      open({
        icon: 'success',
        content: '댓글을 신고했습니다.',
      });
    },
    onError: () => {
      open({
        icon: 'error',
        content: '이미 신고한 댓글입니다.',
      });
    },
  });
}

export const useDeleteCommentMutation = (queryId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CommentQueryKey.list(Number(queryId)) });
    },
  });
};

import { paths } from '@/__generated__/schema2';
import { apiV2 } from '@api/index';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useRouter } from 'next/router';

export default function useCommentMutation() {
  const queryClient = useQueryClient();
  const { query } = useRouter();

  const { POST } = apiV2.get();

  return useMutation({
    mutationKey: ['/comment/v2/{commentId}/like'],
    mutationFn: (commentId: number) => POST('/comment/v2/{commentId}/like', { params: { path: { commentId } } }),
    onMutate: async commentId => {
      await queryClient.cancelQueries({ queryKey: ['/comment/v2', query.id] });

      const previousComments = queryClient.getQueryData(['/comment/v2', query.id]);

      type Comments =
        paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'];
      queryClient.setQueryData<InfiniteData<{ comments: Comments }>>(['/comment/v2', query.id], oldData => {
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
      });
      return { previousComments };
    },
    onError: (err, commentId, context) => {
      queryClient.setQueryData(['/comment/v2', query.id], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/comment/v2', query.id] });
    },
  });
}

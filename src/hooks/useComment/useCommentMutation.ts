import { paths } from '@/__generated__/schema';
import { apiV2 } from '@api/index';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useRouter } from 'next/router';

export default function useCommentMutation() {
  const queryClient = useQueryClient();
  const { query } = useRouter();

  const { POST } = apiV2.get();

  return useMutation({
    mutationKey: ['/comment/v1/{commentId}/like'],
    mutationFn: (commentId: number) => POST('/comment/v1/{commentId}/like', { params: { path: { commentId } } }),
    onMutate: async commentId => {
      await queryClient.cancelQueries({ queryKey: ['/comment/v1', query.id] });

      const previousComments = queryClient.getQueryData(['/comment/v1', query.id]);

      type Comments = paths['/comment/v1']['get']['responses']['200']['content']['application/json'];
      queryClient.setQueryData<InfiniteData<{ data: { data: Comments } }>>(['/comment/v1', query.id], oldData => {
        const newData = produce(oldData, draft => {
          draft?.pages?.forEach(page => {
            page.data.data.comments.forEach(comment => {
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
      queryClient.setQueryData(['/comment/v1', query.id], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/comment/v1', query.id] });
    },
  });
}

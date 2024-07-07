import { postCommentWithMention, PostCommentWithMentionRequest } from '.';
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseMutateBody<T> {
  useMutationOptions?: UseMutationOptions<{ statusCode: number }, AxiosError, T>;
}

export const useMutationPostCommentWithMention = ({
  useMutationOptions,
}: UseMutateBody<PostCommentWithMentionRequest>): UseMutationResult<
  { statusCode: number },
  AxiosError,
  PostCommentWithMentionRequest
> => {
  return useMutation<{ statusCode: number }, AxiosError, PostCommentWithMentionRequest>({
    ...useMutationOptions,
    mutationKey: ['postCommentWithMention'],
    mutationFn: postCommentWithMention,
  });
};

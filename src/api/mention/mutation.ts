import { postCommentWithMention, PostCommentWithMentionRequest, postPostWithMention } from '.';
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseMutateBody<T> {
  useMutationOptions?: UseMutationOptions<void, AxiosError, T>;
}

export const useMutationPostCommentWithMention = ({
  useMutationOptions,
}: UseMutateBody<PostCommentWithMentionRequest>): UseMutationResult<
  void,
  AxiosError,
  PostCommentWithMentionRequest
> => {
  return useMutation<void, AxiosError, PostCommentWithMentionRequest>({
    ...useMutationOptions,
    mutationKey: ['postCommentWithMention'],
    mutationFn: postCommentWithMention,
  });
};

export const useMutationPostPostWithMention = ({
  useMutationOptions,
}: UseMutateBody<PostCommentWithMentionRequest>): UseMutationResult<
  void,
  AxiosError,
  PostCommentWithMentionRequest
> => {
  return useMutation<void, AxiosError, PostCommentWithMentionRequest>({
    ...useMutationOptions,
    mutationKey: ['postPostWithMention'],
    mutationFn: postPostWithMention,
  });
};

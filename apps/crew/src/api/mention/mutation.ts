import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { PostCommentWithMentionRequest } from '.';
import { postCommentWithMention, postPostWithMention } from '.';

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

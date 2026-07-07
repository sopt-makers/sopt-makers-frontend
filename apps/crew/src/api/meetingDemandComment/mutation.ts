import { useToast } from '@sopt-makers/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createMeetingDemandComment,
  deleteMeetingDemandComment,
  reportMeetingDemandComment,
  switchMeetingDemandCommentLike,
} from '.';
import MeetingDemandCommentQueryKey from './MeetingDemandCommentQueryKey';
import type { CreateMeetingDemandCommentRequest, GetMeetingDemandCommentsResponse } from './type';

export const useCreateMeetingDemandCommentMutation = (meetingDemandId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Omit<CreateMeetingDemandCommentRequest, 'meetingDemandId'>) =>
      createMeetingDemandComment({ meetingDemandId, ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingDemandCommentQueryKey.lists(meetingDemandId) });
    },
  });
};

export const useDeleteMeetingDemandCommentMutation = (meetingDemandId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteMeetingDemandComment({ commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingDemandCommentQueryKey.lists(meetingDemandId) });
    },
  });
};

export const useSwitchMeetingDemandCommentLikeMutation = (meetingDemandId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => switchMeetingDemandCommentLike({ commentId }),
    onSuccess: ({ isLiked }, commentId) => {
      queryClient.setQueryData<GetMeetingDemandCommentsResponse>(
        MeetingDemandCommentQueryKey.list(meetingDemandId),
        (currentData) => {
          if (!currentData) return currentData;

          const patchLike = <T extends { id: number; likeCount: number }>(comment: T): T =>
            comment.id === commentId
              ? { ...comment, isLiked, likeCount: comment.likeCount + (isLiked ? 1 : -1) }
              : comment;

          return {
            ...currentData,
            comments: currentData.comments.map((comment) => ({
              ...patchLike(comment),
              replies: comment.replies.map(patchLike),
            })),
          };
        },
      );
    },
  });
};

export const useReportMeetingDemandCommentMutation = () => {
  const { open } = useToast();

  return useMutation({
    mutationFn: (commentId: number) => reportMeetingDemandComment({ commentId }),
    onSuccess: () => {
      open({ icon: 'success', content: '댓글을 신고했습니다.' });
    },
    onError: () => {
      open({ icon: 'error', content: '이미 신고한 댓글입니다.' });
    },
  });
};

import MeetingDemandQueryKey from '@api/meetingDemand/MeetingDemandQueryKey';
import type { GetMeetingDemandResponse } from '@api/meetingDemand/type';
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

const patchMeetingDemandCommentCount = (
  queryClient: ReturnType<typeof useQueryClient>,
  meetingDemandId: number,
  diff: number,
) => {
  queryClient.setQueryData<GetMeetingDemandResponse>(MeetingDemandQueryKey.detail(meetingDemandId), (currentData) =>
    currentData ? { ...currentData, commentCount: Math.max(currentData.commentCount + diff, 0) } : currentData,
  );
};

export const useCreateMeetingDemandCommentMutation = (meetingDemandId: number) => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: (body: Omit<CreateMeetingDemandCommentRequest, 'meetingDemandId'>) =>
      createMeetingDemandComment({ meetingDemandId, ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingDemandCommentQueryKey.lists(meetingDemandId) });
      patchMeetingDemandCommentCount(queryClient, meetingDemandId, 1);
    },
    onError: () => {
      open({ icon: 'error', content: '댓글 등록에 실패했어요. 다시 시도해 주세요.' });
    },
  });
};

export const useDeleteMeetingDemandCommentMutation = (meetingDemandId: number) => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: (commentId: number) => deleteMeetingDemandComment({ commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingDemandCommentQueryKey.lists(meetingDemandId) });
      patchMeetingDemandCommentCount(queryClient, meetingDemandId, -1);
    },
    onError: () => {
      open({ icon: 'error', content: '댓글 삭제에 실패했어요. 다시 시도해 주세요.' });
    },
  });
};

export const useSwitchMeetingDemandCommentLikeMutation = (meetingDemandId: number) => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: (commentId: number) => switchMeetingDemandCommentLike({ commentId }),
    onError: () => {
      open({ icon: 'error', content: '요청에 실패했어요. 다시 시도해 주세요.' });
    },
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

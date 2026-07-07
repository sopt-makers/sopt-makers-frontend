import {
  useDeleteMeetingDemandMutation,
  useReportMeetingDemandMutation,
  useSwitchMeetingDemandWaitMutation,
} from '@api/meetingDemand/mutation';
import { useMeetingDemandQueryOption, useOpenedMeetingsQueryOption } from '@api/meetingDemand/query';
import {
  useCreateMeetingDemandCommentMutation,
  useDeleteMeetingDemandCommentMutation,
  useReportMeetingDemandCommentMutation,
  useSwitchMeetingDemandCommentLikeMutation,
} from '@api/meetingDemandComment/mutation';
import { useMeetingDemandCommentsQueryOption } from '@api/meetingDemandComment/query';
import CommentInput from '@domain/suggestDetail/CommentInput';
import CommentList from '@domain/suggestDetail/CommentList';
import OpenedMeetingSection from '@domain/suggestDetail/OpenedMeetingSection';
import SuggestDetailBody from '@domain/suggestDetail/SuggestDetailBody';
import SuggestDetailCta from '@domain/suggestDetail/SuggestDetailCta';
import SuggestDetailProfile from '@domain/suggestDetail/SuggestDetailProfile';
import SuggestDetailReactionBar from '@domain/suggestDetail/SuggestDetailReactionBar';
import { useToast } from '@sopt-makers/ui';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { useQuery } from '@tanstack/react-query';
import { fromNow } from '@util/dayjs';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { styled } from 'stitches.config';

const SuggestDetailPage = () => {
  const router = useRouter();
  const meetingDemandId = Number(router.query.id);

  const { data: detail } = useQuery(useMeetingDemandQueryOption(meetingDemandId));
  const { data: openedMeetingsData } = useQuery({
    ...useOpenedMeetingsQueryOption(meetingDemandId),
    enabled: !!meetingDemandId && !!detail?.openedMeetingCount,
  });
  const { data: commentsData } = useQuery(useMeetingDemandCommentsQueryOption(meetingDemandId));
  const { mutate: mutateSwitchWait } = useSwitchMeetingDemandWaitMutation();
  const { mutate: mutateReport } = useReportMeetingDemandMutation();
  const { mutate: mutateDelete } = useDeleteMeetingDemandMutation();
  const { mutate: mutateCreateComment } = useCreateMeetingDemandCommentMutation(meetingDemandId);
  const { mutate: mutateDeleteComment } = useDeleteMeetingDemandCommentMutation(meetingDemandId);
  const { mutate: mutateSwitchCommentLike } = useSwitchMeetingDemandCommentLikeMutation(meetingDemandId);
  const { mutate: mutateReportComment } = useReportMeetingDemandCommentMutation();
  const { open: openToast } = useToast();

  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  if (!detail) return null;

  const openedMeetings =
    openedMeetingsData?.meetings.map((meeting) => ({
      id: meeting.meetingId,
      imageUrl: meeting.imageUrl,
      title: meeting.title,
      category: meeting.category,
      author: { id: meeting.user.id, name: meeting.user.name, profileImageUrl: meeting.user.profileImage },
    })) ?? [];

  const comments =
    commentsData?.comments.map((comment) => ({
      id: comment.id,
      author: comment.writer && {
        nickname: comment.writer.anonymousNickname ?? '',
        imageUrl: comment.writer.anonymousImageUrl,
      },
      isMine: comment.isMine,
      createdAt: fromNow(comment.createdDate),
      content: comment.contents,
      likeCount: comment.likeCount,
      isLiked: comment.isLiked,
      isBlocked: comment.isBlockedComment,
      replies: comment.replies.map((reply) => ({
        id: reply.id,
        author: reply.writer && {
          nickname: reply.writer.anonymousNickname ?? '',
          imageUrl: reply.writer.anonymousImageUrl,
        },
        isMine: reply.isMine,
        createdAt: fromNow(reply.createdDate),
        content: reply.contents,
        likeCount: reply.likeCount,
        isLiked: reply.isLiked,
        isBlocked: reply.isBlockedComment,
      })),
    })) ?? [];

  const handleClickWait = () => {
    mutateSwitchWait(meetingDemandId);
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  const handleSubmitComment = (content: string) => {
    mutateCreateComment({ contents: content, isParent: true });
  };

  const handleClickCommentLike = (commentId: number) => {
    mutateSwitchCommentLike(commentId);
  };

  const handleReportSuggestion = () => {
    mutateReport(meetingDemandId);
  };

  const handleDeleteSuggestion = () => {
    mutateDelete(meetingDemandId, {
      onSuccess: () => {
        openToast({ icon: 'success', content: '모임 제안을 삭제했어요.' });
        router.push('/suggest');
      },
    });
  };

  const handleReportComment = (commentId: number) => {
    mutateReportComment(commentId);
  };

  const handleDeleteComment = (commentId: number) => {
    mutateDeleteComment(commentId);
  };

  const handleClickCta = () => {
    // @TODO: 모임 개설 플로우 연동
  };

  return (
    <SPageWrapper>
      <SContentCard>
        <SMainSection>
          <SuggestDetailProfile
            nickname={detail.anonymousNickname}
            imageUrl={detail.anonymousImageUrl}
            createdAt={fromNow(detail.createdDate)}
            isMine={detail.isMine}
            onReport={handleReportSuggestion}
            onDelete={handleDeleteSuggestion}
          />

          <SuggestDetailBody
            title={detail.shortIntro}
            expectation={detail.expectation}
            keywords={detail.meetingKeywordTypes}
          />

          <SuggestDetailCta onClick={handleClickCta} />
        </SMainSection>

        <SuggestDetailReactionBar
          commentCount={detail.commentCount}
          waitCount={detail.waitCount}
          isWaiting={detail.isWaiting}
          onClickComment={handleClickComment}
          onClickWait={handleClickWait}
        />

        {openedMeetings.length > 0 && (
          <SOpenedMeetingSection>
            <OpenedMeetingSection meetings={openedMeetings} />
          </SOpenedMeetingSection>
        )}

        <SCommentSection>
          <CommentList
            comments={comments}
            totalCount={detail.commentCount}
            onClickLike={handleClickCommentLike}
            onReport={handleReportComment}
            onDelete={handleDeleteComment}
          />
          <CommentInput ref={commentInputRef} onSubmit={handleSubmitComment} />
        </SCommentSection>
      </SContentCard>
    </SPageWrapper>
  );
};

export default SuggestDetailPage;

const SPageWrapper = styled('main', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: spacing.s120,
});

const SContentCard = styled('div', {
  'display': 'flex',
  'width': '100%',
  'maxWidth': '780px',
  'flexDirection': 'column',
  'borderRadius': radius.r20,
  'border': `1px solid ${colors.stroke.neutral.subtle}`,
  'backgroundColor': colors.bg.layer.basement,
  'overflow': 'hidden',

  '@tablet': {
    maxWidth: '688px',
  },

  '@mobile': {
    maxWidth: 'none',
    border: 'none',
    borderRadius: 0,
  },
});

const SMainSection = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s32,
  'padding': `${spacing.s32} ${spacing.s32} ${spacing.s20}`,

  '@mobile': {
    gap: spacing.s16,
    padding: `0 0 ${spacing.s20}`,
  },
});

const SOpenedMeetingSection = styled('div', {
  'padding': `${spacing.s48} ${spacing.s32}`,

  '@mobile': {
    padding: `${spacing.s32} 0 0`,
  },
});

const SCommentSection = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s80,
  'padding': `${spacing.s48} ${spacing.s32} ${spacing.s32}`,

  '@mobile': {
    gap: spacing.s64,
    padding: `${spacing.s32} 0 ${spacing.s20}`,
  },
});

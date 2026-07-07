import {
  useDeleteMeetingDemandMutation,
  useReportMeetingDemandMutation,
  useSwitchMeetingDemandWaitMutation,
} from '@api/meetingDemand/mutation';
import { useMeetingDemandQueryOption, useOpenedMeetingsQueryOption } from '@api/meetingDemand/query';
import CommentInput from '@domain/suggestDetail/CommentInput';
import CommentList from '@domain/suggestDetail/CommentList';
import { MOCK_MEETING_DEMAND_COMMENTS } from '@domain/suggestDetail/mock';
import OpenedMeetingSection from '@domain/suggestDetail/OpenedMeetingSection';
import SuggestDetailBody from '@domain/suggestDetail/SuggestDetailBody';
import SuggestDetailCta from '@domain/suggestDetail/SuggestDetailCta';
import SuggestDetailProfile from '@domain/suggestDetail/SuggestDetailProfile';
import SuggestDetailReactionBar from '@domain/suggestDetail/SuggestDetailReactionBar';
import type { MeetingDemandCommentData } from '@domain/suggestDetail/types';
import { useToast } from '@sopt-makers/ui';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { useQuery } from '@tanstack/react-query';
import { fromNow } from '@util/dayjs';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';

const SuggestDetailPage = () => {
  const router = useRouter();
  const meetingDemandId = Number(router.query.id);

  const { data: detail } = useQuery(useMeetingDemandQueryOption(meetingDemandId));
  const { data: openedMeetingsData } = useQuery({
    ...useOpenedMeetingsQueryOption(meetingDemandId),
    enabled: !!meetingDemandId && !!detail?.openedMeetingCount,
  });
  const { mutate: mutateSwitchWait } = useSwitchMeetingDemandWaitMutation();
  const { mutate: mutateReport } = useReportMeetingDemandMutation();
  const { mutate: mutateDelete } = useDeleteMeetingDemandMutation();
  const { open: openToast } = useToast();

  const [comments, setComments] = useState(MOCK_MEETING_DEMAND_COMMENTS);
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

  const handleClickWait = () => {
    mutateSwitchWait(meetingDemandId);
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  const handleSubmitComment = (content: string) => {
    // @TODO: 댓글 작성 API 연동, 작성자 정보는 로그인한 유저 정보로 대체
    const newComment: MeetingDemandCommentData = {
      id: Date.now(),
      author: { orgId: '', name: '나' },
      isAuthor: true,
      createdAt: '방금 전',
      content,
      likeCount: 0,
      isLiked: false,
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handleClickCommentLike = (commentId: number, isLiked: boolean) => {
    // @TODO: 댓글 좋아요 API 연동
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, isLiked, likeCount: comment.likeCount + (isLiked ? 1 : -1) } : comment,
      ),
    );
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
    // @TODO: 댓글 신고 API 연동
    void commentId;
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
          commentCount={comments.length}
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
          <CommentList comments={comments} onClickLike={handleClickCommentLike} onReport={handleReportComment} />
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

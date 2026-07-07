import CommentInput from '@domain/suggestDetail/CommentInput';
import CommentList from '@domain/suggestDetail/CommentList';
import { MOCK_MEETING_DEMAND_COMMENTS, MOCK_MEETING_DEMAND_DETAIL } from '@domain/suggestDetail/mock';
import OpenedMeetingSection from '@domain/suggestDetail/OpenedMeetingSection';
import SuggestDetailBody from '@domain/suggestDetail/SuggestDetailBody';
import SuggestDetailCta from '@domain/suggestDetail/SuggestDetailCta';
import SuggestDetailProfile from '@domain/suggestDetail/SuggestDetailProfile';
import SuggestDetailReactionBar from '@domain/suggestDetail/SuggestDetailReactionBar';
import type { MeetingDemandCommentData } from '@domain/suggestDetail/types';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';

const SuggestDetailPage = () => {
  const router = useRouter();
  // @TODO: router.query.id 로 모임 제안 상세 조회 API 연동
  void router.query.id;

  const [detail, setDetail] = useState(MOCK_MEETING_DEMAND_DETAIL);
  const [comments, setComments] = useState(MOCK_MEETING_DEMAND_COMMENTS);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleClickWait = (isWaiting: boolean) => {
    // @TODO: 기다려요 수 증감 API 연동 후 서버 응답으로 상태 갱신
    setDetail((prev) => ({
      ...prev,
      isWaiting,
      waitCount: prev.waitCount + (isWaiting ? 1 : -1),
    }));
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
    // @TODO: 모임 제안 신고 API 연동
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
          <SuggestDetailProfile author={detail.author} createdAt={detail.createdAt} onReport={handleReportSuggestion} />

          <SuggestDetailBody
            title={detail.shortIntro}
            expectation={detail.expectation}
            keywords={detail.keywords}
            viewCount={detail.viewCount}
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

        {detail.openedMeetings.length > 0 && (
          <SOpenedMeetingSection>
            <OpenedMeetingSection meetings={detail.openedMeetings} />
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

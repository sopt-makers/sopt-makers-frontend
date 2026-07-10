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
import { useUserProfileQueryOption } from '@api/user/query';
import CommentInput from '@domain/suggestDetail/CommentInput';
import CommentList from '@domain/suggestDetail/CommentList';
import { toCommentData, toOpenedMeetingData } from '@domain/suggestDetail/mapper';
import OpenedMeetingSection from '@domain/suggestDetail/OpenedMeetingSection';
import SuggestDetailBody from '@domain/suggestDetail/SuggestDetailBody';
import SuggestDetailCta from '@domain/suggestDetail/SuggestDetailCta';
import SuggestDetailProfile from '@domain/suggestDetail/SuggestDetailProfile';
import SuggestDetailReactionBar from '@domain/suggestDetail/SuggestDetailReactionBar';
import { useDisplay } from '@hook/useDisplay';
import { useToast } from '@sopt-makers/ui';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { useQuery } from '@tanstack/react-query';
import { fromNow } from '@util/dayjs';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const SuggestDetailPage = () => {
  const router = useRouter();
  const { isMobile } = useDisplay();
  const meetingDemandId = Number(router.query.id);

  const { data: me } = useQuery(useUserProfileQueryOption());
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

  const openedMeetings = openedMeetingsData?.meetings.map(toOpenedMeetingData) ?? [];
  const comments = commentsData?.comments.map(toCommentData) ?? [];

  const handleClickWait = () => {
    ampli.clickGroupSuggestWait({
      location: router.pathname,
      platform_type: isMobile ? 'MO' : 'PC',
      suggest_id: meetingDemandId,
      suggest_status: detail.status === 'BEFORE_OPEN' ? 'BEFORE_OPEN' : 'OPEN',
      user_id: Number(me?.orgId),
    });

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
    router.push(`/make?meetingDemandId=${meetingDemandId}`);
  };

  const handleClickOpenedMeeting = (meetingId: number) => {
    router.push(`/detail?id=${meetingId}`);
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
            <OpenedMeetingSection meetings={openedMeetings} onClickMeeting={handleClickOpenedMeeting} />
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

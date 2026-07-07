import ReportMenu from '@domain/suggestDetail/ReportMenu';
import type { MeetingDemandCommentData } from '@domain/suggestDetail/types';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconHeartFilled, IconHeartOutlined } from '@sopt-mds/icons';
import { Avatar, ReactionButton } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface CommentItemProps {
  comment: MeetingDemandCommentData;
  onClickLike: (isLiked: boolean) => void;
  onReport: () => void;
  onDelete: () => void;
}

const CommentItem = ({ comment, onClickLike, onReport, onDelete }: CommentItemProps) => {
  const { author, isMine, createdAt, content, likeCount, isLiked, isBlocked } = comment;
  const HeartIcon = isLiked ? IconHeartFilled : IconHeartOutlined;
  const nickname = author?.nickname ?? '알 수 없음';

  if (isBlocked) {
    return (
      <SComment>
        <SBlockedText>차단된 사용자의 댓글이에요.</SBlockedText>
      </SComment>
    );
  }

  return (
    <SComment>
      <SHead>
        <SAuthor>
          <Avatar size={32} src={author?.imageUrl} alt={nickname} />
          <SAuthorName>{nickname}</SAuthorName>
          <SCreatedAt>{createdAt}</SCreatedAt>
        </SAuthor>

        <ReportMenu
          reportMessage='댓글을 신고하시겠습니까?'
          onConfirmReport={isMine ? undefined : onReport}
          deleteMessage='댓글을 삭제할까요?'
          onConfirmDelete={isMine ? onDelete : undefined}
        />
      </SHead>

      <SBody>
        <SContent>{content}</SContent>
        <ReactionButton
          size='xsmall'
          selected={isLiked}
          leftAddon={<HeartIcon />}
          count={likeCount}
          style={{ color: isLiked ? colors.fg.brand.default : undefined }}
          onClick={() => onClickLike(!isLiked)}
        />
      </SBody>
    </SComment>
  );
};

export default CommentItem;

const SComment = styled('li', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: spacing.s8,
});

const SHead = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const SAuthor = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.s8,
});

const SBlockedText = styled('p', {
  color: colors.fg.neutral.ghost,
  ...typography.body2,
});

const SAuthorName = styled('p', {
  ...typography.label1,

  '@mobile': {
    ...typography.label2,
  },

  'color': colors.fg.neutral.bold,
});

const SCreatedAt = styled('p', {
  'color': colors.fg.neutral.ghost,
  ...typography.label3,

  '@mobile': {
    ...typography.label4,
  },
});

const SBody = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: spacing.s8,
  paddingLeft: spacing.s40,
});

const SContent = styled('p', {
  'color': colors.fg.neutral.default,
  'whiteSpace': 'pre-wrap',
  'wordBreak': 'break-word',
  ...typography.body1,

  '@mobile': {
    ...typography.body2,
  },
});

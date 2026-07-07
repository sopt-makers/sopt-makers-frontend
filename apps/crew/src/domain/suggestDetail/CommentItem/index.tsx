import { playgroundURL } from '@constant/url';
import ReportMenu from '@domain/suggestDetail/ReportMenu';
import type { MeetingDemandCommentData } from '@domain/suggestDetail/types';
import { playgroundLink } from '@sopt/constant';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconHeartFilled, IconHeartOutlined } from '@sopt-mds/icons';
import { Avatar, ReactionButton } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface CommentItemProps {
  comment: MeetingDemandCommentData;
  onClickLike: (isLiked: boolean) => void;
  onReport: () => void;
}

const CommentItem = ({ comment, onClickLike, onReport }: CommentItemProps) => {
  const { author, isAuthor, createdAt, content, likeCount, isLiked } = comment;
  const HeartIcon = isLiked ? IconHeartFilled : IconHeartOutlined;

  return (
    <SComment>
      <SHead>
        <SAuthorLink
          href={`${playgroundURL}${playgroundLink.memberDetail(author.orgId)}`}
          target='_blank'
          rel='noreferrer'
        >
          <Avatar size={32} alt={author.name} />
          <SAuthorName>{author.name}</SAuthorName>
          <SCreatedAt>{createdAt}</SCreatedAt>
        </SAuthorLink>

        {!isAuthor && <ReportMenu reportMessage='댓글을 신고하시겠습니까?' onConfirmReport={onReport} />}
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

const SAuthorLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.s8,
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

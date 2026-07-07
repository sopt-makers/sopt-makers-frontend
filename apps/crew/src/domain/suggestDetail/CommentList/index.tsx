import CommentItem from '@domain/suggestDetail/CommentItem';
import type { MeetingDemandCommentData } from '@domain/suggestDetail/types';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

interface CommentListProps {
  comments: MeetingDemandCommentData[];
  onClickLike: (commentId: number, isLiked: boolean) => void;
  onReport: (commentId: number) => void;
}

const CommentList = ({ comments, onClickLike, onReport }: CommentListProps) => {
  return (
    <SSection>
      <SHeading>
        댓글 <span>{comments.length}</span>
      </SHeading>

      <SList>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onClickLike={(isLiked) => onClickLike(comment.id, isLiked)}
            onReport={() => onReport(comment.id)}
          />
        ))}
      </SList>
    </SSection>
  );
};

export default CommentList;

const SSection = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: spacing.s20,
});

const SHeading = styled('h2', {
  'color': colors.fg.neutral.default,
  ...typography.heading3,

  '@mobile': {
    ...typography.label2,
  },

  'span': {
    color: colors.fg.neutral.default,
  },
});

const SList = styled('ul', {
  'display': 'flex',
  'width': '100%',
  'flexDirection': 'column',
  'gap': spacing.s40,

  '@mobile': {
    gap: spacing.s24,
  },
});

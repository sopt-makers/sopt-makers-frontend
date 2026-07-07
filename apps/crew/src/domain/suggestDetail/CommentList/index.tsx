import CommentItem from '@domain/suggestDetail/CommentItem';
import type { MeetingDemandParentCommentData } from '@domain/suggestDetail/types';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

interface CommentListProps {
  comments: MeetingDemandParentCommentData[];
  totalCount: number;
  onClickLike: (commentId: number, isLiked: boolean) => void;
  onReport: (commentId: number) => void;
  onDelete: (commentId: number) => void;
}

const CommentList = ({ comments, totalCount, onClickLike, onReport, onDelete }: CommentListProps) => {
  return (
    <SSection>
      <SHeading>
        댓글 <span>{totalCount}</span>
      </SHeading>

      <SList>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem
              comment={comment}
              onClickLike={(isLiked) => onClickLike(comment.id, isLiked)}
              onReport={() => onReport(comment.id)}
              onDelete={() => onDelete(comment.id)}
            />

            {comment.replies.length > 0 && (
              <SReplyList>
                {comment.replies.map((reply) => (
                  <li key={reply.id}>
                    <CommentItem
                      comment={reply}
                      onClickLike={(isLiked) => onClickLike(reply.id, isLiked)}
                      onReport={() => onReport(reply.id)}
                      onDelete={() => onDelete(reply.id)}
                    />
                  </li>
                ))}
              </SReplyList>
            )}
          </li>
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

const SReplyList = styled('ul', {
  'display': 'flex',
  'width': '100%',
  'flexDirection': 'column',
  'gap': spacing.s24,
  'marginTop': spacing.s24,
  'paddingLeft': spacing.s40,

  '@mobile': {
    gap: spacing.s16,
    marginTop: spacing.s16,
    paddingLeft: spacing.s24,
  },
});

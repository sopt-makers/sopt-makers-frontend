import { IconHeartFilled, IconHeartOutlined, IconMessageDotsOutlined } from '@sopt-mds/icons';
import { ReactionButton } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface FeedCommentLikeSectionProps {
  isLiked: boolean;
  commentCount: number;
  likeCount: number;
  onClickComment: () => void;
  onClickLike: () => void;
}

export default function FeedCommentLikeSection({
  isLiked,
  commentCount,
  likeCount,
  onClickComment,
  onClickLike,
}: FeedCommentLikeSectionProps) {
  const HeartIcon = isLiked ? IconHeartFilled : IconHeartOutlined;

  return (
    <>
      <SButtonArea>
        <ReactionButton
          size='xsmall'
          leftAddon={<IconMessageDotsOutlined width={16} height={16} />}
          count={commentCount}
          onClick={onClickComment}
        >
          댓글
        </ReactionButton>
      </SButtonArea>
      <Divider />
      <SButtonArea>
        <ReactionButton
          size='xsmall'
          selected={isLiked}
          leftAddon={<HeartIcon width={16} height={16} />}
          count={likeCount}
          onClick={onClickLike}
        >
          좋아요
        </ReactionButton>
      </SButtonArea>
    </>
  );
}

const SButtonArea = styled('div', {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
});
const Divider = styled('div', {
  background: '$gray700',
  width: '1px',
  height: '24px',
});

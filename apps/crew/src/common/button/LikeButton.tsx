import { LIKE_MAX_COUNT } from '@constant/feed';
import { IconHeartFilled, IconHeartOutlined } from '@sopt-mds/icons';
import { ReactionButton } from '@sopt-mds/ui';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onClickLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LikeButton({ isLiked, likeCount, onClickLike }: LikeButtonProps) {
  const formattedLikeCount = likeCount > LIKE_MAX_COUNT ? `${LIKE_MAX_COUNT}+` : likeCount;
  const HeartIcon = isLiked ? IconHeartFilled : IconHeartOutlined;

  return (
    <ReactionButton
      size='medium'
      selected={isLiked}
      leftAddon={<HeartIcon />}
      count={formattedLikeCount}
      onClick={onClickLike}
    />
  );
}

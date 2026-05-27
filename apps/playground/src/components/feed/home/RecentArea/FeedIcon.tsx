import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconHeart } from '@sopt-makers/icons';

import MessageIc from '@/public/icons/icon-message-square.svg';
import ThumbsUpIc from '@/public/icons/icon-thumbs-up.svg';

type IconType = 'message' | 'thumbsUp' | 'heart';

interface FeedIconProps {
  type: IconType;
  count: number;
}

const iconMap = {
  message: MessageIc,
  thumbsUp: ThumbsUpIc,
  heart: IconHeart as React.FC<React.SVGProps<SVGSVGElement>>,
};

const FeedIcon = ({ type, count }: FeedIconProps) => {
  const Icon = iconMap[type];

  return (
    <FeedIconLayout>
      <Icon width={14} height={14} color={colors.gray400} />
      <StyledCount>{count}</StyledCount>
    </FeedIconLayout>
  );
};

export default FeedIcon;

const FeedIconLayout = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const StyledCount = styled.div`
  color: ${colors.gray400};
  ${fonts.LABEL_12_SB}
`;

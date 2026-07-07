import { colors, spacing } from '@sopt-mds/design-tokens';
import { IconHeartFilled, IconHeartOutlined, IconMessageDotsOutlined } from '@sopt-mds/icons';
import { ReactionButton } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface SuggestDetailReactionBarProps {
  commentCount: number;
  waitCount: number;
  isWaiting: boolean;
  onClickComment: () => void;
  onClickWait: (isWaiting: boolean) => void;
}

const SuggestDetailReactionBar = ({
  commentCount,
  waitCount,
  isWaiting,
  onClickComment,
  onClickWait,
}: SuggestDetailReactionBarProps) => {
  const HeartIcon = isWaiting ? IconHeartFilled : IconHeartOutlined;

  return (
    <SBar>
      <SButtonSlot>
        <ReactionButton
          size='xsmall'
          leftAddon={<IconMessageDotsOutlined />}
          count={commentCount}
          onClick={onClickComment}
        >
          댓글
        </ReactionButton>
      </SButtonSlot>

      <SDivider />

      <SButtonSlot>
        <ReactionButton
          size='xsmall'
          selected={isWaiting}
          leftAddon={<HeartIcon />}
          count={waitCount}
          onClick={() => onClickWait(!isWaiting)}
        >
          기다려요
        </ReactionButton>
      </SButtonSlot>
    </SBar>
  );
};

export default SuggestDetailReactionBar;

const SBar = styled('div', {
  'display': 'flex',
  'width': '100%',
  'alignItems': 'center',
  'borderTop': `1px solid ${colors.stroke.neutral.subtle}`,
  'borderBottom': `1px solid ${colors.stroke.neutral.subtle}`,

  // 모바일은 카드 테두리가 없는 풀블리드 레이아웃이라, 화면 끝까지 닿도록 뷰포트 기준으로 뺀다
  '@mobile': {
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
  },
});

const SButtonSlot = styled('div', {
  display: 'flex',
  flex: '1 0 0',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${spacing.s12} ${spacing.s10}`,
});

const SDivider = styled('div', {
  width: '1px',
  height: spacing.s24,
  backgroundColor: colors.stroke.neutral.subtle,
});

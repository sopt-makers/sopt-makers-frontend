import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconHeartFilled, IconHeartOutlined } from '@sopt-mds/icons';
import { ReactionButton, Tag } from '@sopt-mds/ui';
import type { MouseEvent } from 'react';
import { styled } from 'stitches.config';

interface SuggestionCardProps {
  suggestion: {
    shortIntro: string;
    expectation: string;
    status: string;
    isMine: boolean;
    waitCount: number;
    isWaiting: boolean;
  };
  onClick: () => void;
  onWaitingChange: (isWaiting: boolean) => void;
}

const SuggestionCard = ({ suggestion, onClick, onWaitingChange }: SuggestionCardProps) => {
  const { isMobile } = useDisplay();
  const { shortIntro, expectation, status, isMine, waitCount, isWaiting } = suggestion;
  const isWaitingSelected = !isMine && isWaiting;
  const HeartIcon = isWaitingSelected ? IconHeartFilled : IconHeartOutlined;
  const handleWaitingClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isMine) return;

    onWaitingChange(!isWaiting);
  };

  return (
    <SCard onClick={onClick}>
      <SContent>
        <Tag size='small' shape='pill' variant={status === 'BEFORE_OPEN' ? 'default' : 'secondary'} type='solid'>
          {status === 'BEFORE_OPEN' ? '개설 전' : '개설 완료'}
        </Tag>

        <SText>
          <STitle>{shortIntro}</STitle>
          <SDescription>{expectation}</SDescription>
        </SText>
      </SContent>

      <SReactionArea>
        <SReactionButton
          size={isMobile ? 'xsmall' : 'small'}
          selected={isWaitingSelected}
          leftAddon={<HeartIcon />}
          count={isMine ? undefined : waitCount}
          onClick={handleWaitingClick}
        >
          기다려요
        </SReactionButton>
      </SReactionArea>
    </SCard>
  );
};

export default SuggestionCard;

const SCard = styled('article', {
  'boxSizing': 'border-box',
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s20,
  'width': '392px',
  'height': '182px',
  'padding': `${spacing.s20} ${spacing.s24}`,
  'borderRadius': radius.r8,
  'backgroundColor': colors.bg.neutral.ghost,
  'cursor': 'pointer',

  '@mobile': {
    justifyContent: 'space-between',
    gap: spacing.s12,
    width: '100%',
    height: 'auto',
    minHeight: '140px',
    padding: spacing.s16,
  },
});

const SContent = styled('div', {
  'display': 'flex',
  'minWidth': 0,
  'flexDirection': 'column',
  'alignItems': 'flex-start',
  'gap': spacing.s12,

  '@mobile': {
    gap: spacing.s8,
  },
});

const SText = styled('div', {
  'display': 'flex',
  'width': '100%',
  'minWidth': 0,
  'flexDirection': 'column',
  'gap': spacing.s2,

  '@mobile': {
    gap: spacing.s0,
  },
});

const STitle = styled('h3', {
  'width': '100%',
  'overflow': 'hidden',
  'color': colors.fg.neutral.bold,
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
  ...typography.title3,

  '@mobile': {
    ...typography.title4,
  },
});

const SDescription = styled('p', {
  width: '100%',
  overflow: 'hidden',
  color: colors.fg.neutral.subtle,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  ...typography.body2,
});

const SReactionArea = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
});

const SReactionButton = styled(ReactionButton, {
  '@mobile': {
    '&[aria-pressed="true"]': {
      color: `${colors.fg.brand.default} !important`,
    },
  },
});

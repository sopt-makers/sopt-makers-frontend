import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight, IconHeartFilled, IconHeartOutlined } from '@sopt-mds/icons';
import Link from 'next/link';
import { styled } from 'stitches.config';

import type { MumuFeedCardData } from '../types';

interface MumuFeedCardProps {
  post: MumuFeedCardData;
}

const MumuFeedCard = ({ post }: MumuFeedCardProps) => {
  const HeartIcon = post.isLiked ? IconHeartFilled : IconHeartOutlined;

  // @TODO: 피드 상세 페이지 경로 확정 후 postId에 해당하는 피드 상세 페이지로 이동
  return (
    <Container href={`/post?id=${post.postId}`}>
      <MeetingInfo>
        <MeetingCategory>{post.meetingCategory}</MeetingCategory>
        <MeetingTitle>{post.meetingTitle}</MeetingTitle>
        <IconChevronRight width={24} height={24} />
      </MeetingInfo>

      <PostInfo>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>
      </PostInfo>

      <PostReaction>
        <span>댓글 {post.commentCount}</span>
        <LikeCount liked={post.isLiked}>
          <HeartIcon width={16} height={16} />
          {post.likeCount}
        </LikeCount>
      </PostReaction>
    </Container>
  );
};

export default MumuFeedCard;

const Container = styled(Link, {
  'boxSizing': 'border-box',
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s20,
  'width': '400px',
  'height': '253px',
  'padding': `${spacing.s20} ${spacing.s20} ${spacing.s28}`,
  'border': `1px solid ${colors.stroke.brand.default}`,
  'borderRadius': radius.r12,
  'backgroundColor': colors.bg.neutral.ghost,

  '@mobile': {
    width: '243px',
    height: '158px',
    padding: spacing.s16,
    gap: spacing.s12,
  },
});

const MeetingInfo = styled('div', {
  'display': 'flex',
  'padding': `0 ${spacing.s20}`,
  'borderRadius': radius.r12,
  'backgroundColor': colors.bg.neutral.subtle,
  'alignItems': 'center',
  'height': '57px',

  '@mobile': {
    height: '36px',
    borderRadius: radius.r8,
  },
});

const MeetingCategory = styled('span', {
  'color': colors.fg.brand.default,
  ...typography.label2,
  'marginRight': spacing.s8,

  '@mobile': {
    ...typography.label4,
  },
});

const MeetingTitle = styled('span', {
  'overflow': 'hidden',
  'color': colors.fg.neutral.default,
  'flex': 1,
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
  ...typography.label2,
  'marginRight': spacing.s16,

  '@mobile': {
    ...typography.label4,
    marginRight: spacing.s0,
  },
});

const PostInfo = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',

  '@mobile': {
    gap: spacing.s4,
  },
});

const PostTitle = styled('h3', {
  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
  'color': colors.fg.neutral.bold,
  ...typography.title4,

  '@mobile': {
    ...typography.title5,
  },
});

const PostContent = styled('p', {
  'display': '-webkit-box',
  'minHeight': `calc(${typography.body1.lineHeight} * 2)`,
  'overflow': 'hidden',
  'color': colors.fg.neutral.default,
  '-webkitBoxOrient': 'vertical',
  '-webkitLineClamp': 2,
  ...typography.body1,

  '@mobile': {
    display: 'block',
    minHeight: 'auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...typography.body3,
  },
});

const PostReaction = styled('div', {
  'display': 'flex',
  'color': colors.fg.neutral.bold,
  'alignItems': 'center',
  'justifyContent': 'space-between',
  ...typography.body2,

  '@mobile': {
    ...typography.label4,
  },
});

const LikeCount = styled('span', {
  display: 'flex',
  color: colors.fg.neutral.default,
  alignItems: 'center',
  gap: spacing.s4,
  padding: `${spacing.s2} ${spacing.s4}`,

  variants: {
    liked: {
      true: {
        color: colors.fg.brand.default,
      },
    },
  },
});

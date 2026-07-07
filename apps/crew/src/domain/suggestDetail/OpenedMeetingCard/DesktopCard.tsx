import type { OpenedMeetingData } from '@domain/suggestDetail/types';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { Avatar } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface DesktopCardProps {
  meeting: OpenedMeetingData;
  onClick?: () => void;
}

const DesktopCard = ({ meeting, onClick }: DesktopCardProps) => {
  return (
    <SCard onClick={onClick}>
      <SImage src={meeting.imageUrl ?? ''} alt='' />

      <SContents>
        <SProfileRow>
          <Avatar src={meeting.author.profileImageUrl} alt={meeting.author.name} size={24} />
          <SAuthorName>{meeting.author.name}</SAuthorName>
          <SDivider />
          <SCategory>{meeting.category}</SCategory>
        </SProfileRow>

        <STextGroup>
          <STitle>{meeting.title}</STitle>
        </STextGroup>
      </SContents>
    </SCard>
  );
};

export default DesktopCard;

const SCard = styled('div', {
  display: 'flex',
  width: '285px',
  flexDirection: 'column',
  gap: spacing.s16,
  flexShrink: 0,
  cursor: 'pointer',
});

const SImage = styled('img', {
  width: '100%',
  height: '180px',
  objectFit: 'cover',
  borderRadius: radius.r12,
  backgroundColor: colors.bg.neutral.ghost,
});

const SContents = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s8,
  width: '100%',
});

const SProfileRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.s6,
});

const SAuthorName = styled('p', {
  color: colors.fg.neutral.bold,
  whiteSpace: 'nowrap',
  ...typography.label4,
});

const SCategory = styled('p', {
  color: colors.fg.neutral.bold,
  whiteSpace: 'nowrap',
  ...typography.label4,
});

const SDivider = styled('div', {
  width: '1px',
  height: spacing.s8,
  backgroundColor: colors.stroke.neutral.subtle,
});

const STextGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const STitle = styled('p', {
  height: '52px',
  overflow: 'hidden',
  color: colors.fg.neutral.bold,
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  ...typography.heading4,
});

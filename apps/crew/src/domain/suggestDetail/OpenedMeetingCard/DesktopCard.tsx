import type { OpenedMeetingData } from '@domain/suggestDetail/types';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconUserOutlined } from '@sopt-mds/icons';
import { Avatar } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface DesktopCardProps {
  meeting: OpenedMeetingData;
  onClick?: () => void;
}

const DesktopCard = ({ meeting, onClick }: DesktopCardProps) => {
  return (
    <SCard onClick={onClick}>
      <SImage src={meeting.imageUrl} alt='' />

      <SContents>
        <SProfileRow>
          <Avatar src={meeting.author.profileImageUrl} alt={meeting.author.name} size={24} />
          <SAuthorName>{meeting.author.name}</SAuthorName>
          <SDivider />
          <SCategory>{meeting.category}</SCategory>
        </SProfileRow>

        <STextGroup>
          <STitle>{meeting.title}</STitle>
          <SDescription>{meeting.description}</SDescription>
        </STextGroup>

        <SCondition>
          <IconUserOutlined width={16} height={16} />
          <SConditionText>
            {meeting.approvedCount}/{meeting.capacity}명
          </SConditionText>
          <SDot />
          <SConditionText>
            {meeting.generation} / {meeting.parts.join(', ')}
          </SConditionText>
        </SCondition>
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

const SDescription = styled('p', {
  overflow: 'hidden',
  color: colors.fg.neutral.subtle,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  ...typography.body2,
});

const SCondition = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.s6,
  color: colors.fg.neutral.subtle,
});

const SConditionText = styled('p', {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  ...typography.label4,
});

const SDot = styled('div', {
  width: '2px',
  height: '2px',
  flexShrink: 0,
  borderRadius: radius.full,
  backgroundColor: colors.fg.neutral.subtle,
});

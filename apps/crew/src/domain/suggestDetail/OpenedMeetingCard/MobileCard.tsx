import type { OpenedMeetingData } from '@domain/suggestDetail/types';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

interface MobileCardProps {
  meeting: OpenedMeetingData;
  onClick?: () => void;
}

const MobileCard = ({ meeting, onClick }: MobileCardProps) => {
  return (
    <SCard onClick={onClick}>
      <SImage src={meeting.imageUrl ?? ''} alt={meeting.title} />
      <STitle>{meeting.title}</STitle>
      <SInfo>
        <span>{meeting.category}</span>
        <span>|</span>
        <span>{meeting.author.name}</span>
      </SInfo>
    </SCard>
  );
};

export default MobileCard;

const SCard = styled('div', {
  display: 'flex',
  width: '152px',
  flexDirection: 'column',
  gap: spacing.s8,
  flexShrink: 0,
  cursor: 'pointer',
});

const SImage = styled('img', {
  width: '100%',
  height: '105px',
  objectFit: 'cover',
  borderRadius: radius.r12,
  backgroundColor: colors.bg.neutral.ghost,
});

const STitle = styled('p', {
  overflow: 'hidden',
  color: colors.fg.neutral.bold,
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  ...typography.label4,
});

const SInfo = styled('div', {
  display: 'flex',
  gap: spacing.s2,
  alignItems: 'center',
  color: colors.fg.neutral.subtle,
  whiteSpace: 'nowrap',
  ...typography.label4,
  fontSize: '11px',
  lineHeight: '14px',
});

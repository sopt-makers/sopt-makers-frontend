import OpenedMeetingCard from '@domain/suggestDetail/OpenedMeetingCard';
import type { OpenedMeetingData } from '@domain/suggestDetail/types';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

interface OpenedMeetingSectionProps {
  meetings: OpenedMeetingData[];
  onClickMeeting: (meetingId: number) => void;
}

const OpenedMeetingSection = ({ meetings, onClickMeeting }: OpenedMeetingSectionProps) => {
  if (meetings.length === 0) return null;

  return (
    <SSection>
      <STitle>
        {'🎉 여기서 '}
        <SHighlight>{meetings.length}개</SHighlight>의 모임이 열렸어요!
      </STitle>

      <SList>
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <OpenedMeetingCard meeting={meeting} onClick={() => onClickMeeting(meeting.id)} />
          </li>
        ))}
      </SList>
    </SSection>
  );
};

export default OpenedMeetingSection;

const SSection = styled('div', {
  'display': 'flex',
  'width': '100%',
  'flexDirection': 'column',
  'gap': spacing.s20,

  '@mobile': {
    gap: spacing.s16,
  },
});

const STitle = styled('p', {
  'color': colors.fg.neutral.bold,
  ...typography.heading3,

  '@mobile': {
    ...typography.label2,
  },
});

const SHighlight = styled('span', {
  color: colors.fg.brand.default,
});

const SList = styled('ul', {
  'display': 'flex',
  'width': '100%',
  'gap': spacing.s20,
  'overflowX': 'auto',
  'scrollbarWidth': 'none',
  '-ms-overflow-style': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '@mobile': {
    gap: spacing.s12,
  },
});

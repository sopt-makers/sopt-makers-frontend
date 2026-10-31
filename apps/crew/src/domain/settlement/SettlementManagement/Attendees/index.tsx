import AttendeeControls from '@domain/settlement/SettlementManagement/Attendees/AttendeeControls';
import AttendeeList from '@domain/settlement/SettlementManagement/Attendees/AttendeeList';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

const Attendees = () => (
  <SContainer>
    <SLabel>
      <STitle>참석자 추가</STitle>
      <SDescription>회차별 누락된 참석자를 추가해주세요.</SDescription>
    </SLabel>
    <AttendeeControls />
    <AttendeeList />
  </SContainer>
);

export default Attendees;

const SContainer = styled('section', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s24,
  'marginTop': spacing.s80,
  '@mobile': {
    gap: spacing.s10,
    marginTop: spacing.s40,
  },
});

const SLabel = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s2,
  paddingInline: spacing.s2,
});

const STitle = styled('h2', {
  ...typography.title2,
  'color': colors.fg.neutral.bold,
  '@mobile': {
    ...typography.title5,
  },
});

const SDescription = styled('p', {
  ...typography.body2,
  color: colors.fg.neutral.default,
});

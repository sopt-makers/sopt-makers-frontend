import AttendeeControls from '@domain/settlement/SettlementManagement/Attendees/AttendeeControls';
import AttendeeList from '@domain/settlement/SettlementManagement/Attendees/AttendeeList';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconDownload } from '@sopt-mds/icons';
import { styled } from 'stitches.config';

const Attendees = () => (
  <SContainer>
    <SHeader>
      <SLabel>
        <STitle>참석자 추가</STitle>
        <SDescription>회차별 누락된 참석자를 추가해주세요.</SDescription>
      </SLabel>
      <SDownloadButton
        type='button'
        onClick={() => {
          // @TODO: 회차 전체 참석자 CSV 다운로드 API 연동 (장정훈)
        }}
      >
        <IconDownload width={20} height={20} aria-hidden />
        CSV 다운로드
      </SDownloadButton>
    </SHeader>
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

const SHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const SDownloadButton = styled('button', {
  ...typography.label2,
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'height': '56px',
  'padding': `0 ${spacing.s20}`,
  'border': `1px solid ${colors.stroke.neutral.default}`,
  'borderRadius': radius.r10,
  'color': colors.fg.neutral.bold,
  '@mobile': {
    display: 'none',
  },
});

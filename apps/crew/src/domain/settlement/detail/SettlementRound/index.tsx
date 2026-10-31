import { AttendeeActions, LeaderActions } from '@domain/settlement/detail/RoundActions';
import { useDisplay } from '@hook/useDisplay';
import useModal from '@hook/useModal';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight, IconLink } from '@sopt-mds/icons';
import { Tag } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

import type { RoundType } from '@/domain/settlement/types';

import AttendanceModal from '../AttendanceModal';

const ATTENDANCE_LABELS = {
  NOT_ATTENDING: '미참석',
  ATTENDING: '참석',
  ATTENDED: '참석',
} as const;

interface SettlementRoundProps {
  meetingId: number;
  round: RoundType;
  isLeader: boolean;
  isEnded: boolean;
  hasClosedRound: boolean;
}

const SettlementRound = ({ meetingId, round, isLeader, isEnded, hasClosedRound }: SettlementRoundProps) => {
  const { isMobile } = useDisplay();
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const isAttending = round.myAttendanceStatus === 'ATTENDING' || round.myAttendanceStatus === 'ATTENDED';
  const attendanceLabel = ATTENDANCE_LABELS[round.myAttendanceStatus ?? 'NOT_ATTENDING'];
  const hasMapLink = !!(round.naverMapLink || round.kakaoMapLink);
  const isRoundInfoModified = round.isPlaceModified || round.isLinkModified || round.isStartTimeModified;

  return (
    <div>
      {(round.isNew || isRoundInfoModified) && (
        <SNotice>
          {round.isNew && <SNew>NEW</SNew>}
          {isRoundInfoModified && <span>수정된 정보가 있어요</span>}
        </SNotice>
      )}

      <SRound>
        <SInfo>
          <SHeading>
            <Tag
              size={isMobile ? 'small' : 'medium'}
              shape='rect'
              variant={isAttending ? 'secondary' : 'default'}
              type='solid'
            >
              {attendanceLabel}
            </Tag>
            <span>{round.roundNumber}차</span>
            {round.startTime && (
              <>
                <SDivider>|</SDivider>
                <STime>{round.startTime}~</STime>
              </>
            )}
          </SHeading>
          <SPlace>📍 {round.place || '장소 미정'}</SPlace>
          {hasMapLink && (
            <SLink
              type='button'
              onClick={() => {
                // @TODO: 지도 링크 선택 및 이동 연결 (장정훈)
              }}
            >
              <IconLink width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} aria-hidden />
              위치 바로가기
            </SLink>
          )}
        </SInfo>

        <SActions attendee={!isLeader}>
          <SAttendance type='button' onClick={handleModalOpen}>
            <span>참석 현황</span>
            <strong>{round.attendeeCount ?? 0}명</strong>
            <IconChevronRight width={24} height={24} aria-hidden />
          </SAttendance>

          {isLeader ? (
            <LeaderActions round={round} isEnded={isEnded} isMobile={isMobile} hasClosedRound={hasClosedRound} />
          ) : (
            <AttendeeActions round={round} isEnded={isEnded} isMobile={isMobile} isAttending={isAttending} />
          )}
        </SActions>
      </SRound>

      <AttendanceModal
        isOpen={isModalOpened}
        onClose={handleModalClose}
        meetingId={meetingId}
        roundNumber={round.roundNumber}
        isLeader={isLeader}
      />
    </div>
  );
};

export default SettlementRound;

const SRound = styled('article', {
  'display': 'flex',
  'justifyContent': 'space-between',
  '@mobile': {
    flexDirection: 'column',
    gap: spacing.s36,
  },
});

const SInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing.s12,
  minWidth: '0px',
});

const SNotice = styled('div', {
  ...typography.body3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing.s8,
  marginBottom: spacing.s4,
  color: colors.fg.neutral.bold,
});

const SNew = styled('span', {
  ...typography.title2,
  'color': colors.fg.brand.default,
  '@mobile': { ...typography.title3 },
});

const SHeading = styled('div', {
  ...typography.title1,
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'color': colors.fg.neutral.bold,
  '@mobile': { ...typography.title3 },
});

const SDivider = styled('span', { color: colors.fg.neutral.subtle });
const STime = styled('span', {
  ...typography.title2,
  '@mobile': { ...typography.title5 },
});
const SPlace = styled('p', {
  ...typography.title2,
  'color': colors.fg.neutral.bold,
  'overflowWrap': 'anywhere',
  '@mobile': { ...typography.title5 },
});
const SLink = styled('button', {
  ...typography.label1,
  'display': 'inline-flex',
  'alignItems': 'center',
  'gap': spacing.s4,
  'height': '56px',
  'padding': `0 26px`,
  'border': `1px solid ${colors.stroke.neutral.subtle}`,
  'borderRadius': radius.full,
  'color': colors.base.gray400,
  '@mobile': {
    ...typography.label3,
    height: '36px',
    marginTop: '-4px',
    padding: `0 ${spacing.s14}`,
  },
});

const SActions = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s8,
  'width': '300px',
  'flexShrink': 0,
  '@mobile': {
    width: '100%',
    gap: spacing.s10,
  },
  'variants': {
    attendee: {
      true: {
        '@mobile': {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          columnGap: spacing.s8,
        },
      },
    },
  },
});
const SAttendance = styled('button', {
  ...typography.title4,
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s12,
  'width': '100%',
  'height': '56px',
  'padding': `0 ${spacing.s20}`,
  'border': 0,
  'borderRadius': '14px',
  'backgroundColor': colors.bg.neutral.subtle,
  'color': colors.fg.neutral.bold,
  'cursor': 'pointer',
  '& span': {
    color: colors.fg.neutral.subtle,
  },
  '& svg': {
    marginLeft: 'auto',
  },
  '@mobile': {
    ...typography.label2,
    height: '46px',
    borderRadius: radius.r8,
  },
});

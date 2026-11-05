import { useRespondToSettlementPayerRequestMutation, useRevokeSettlementPayerMutation } from '@api/settlement/mutation';
import {
  useSettlementDetailQueryOption,
  useSettlementPayerRequestsQueryOption,
  useSettlementPayersQueryOption,
} from '@api/settlement/query';
import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton, Avatar } from '@sopt-mds/ui';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

const PayerRequests = ({ meetingId }: { meetingId: number }) => {
  const { isMobile } = useDisplay();
  const { mutate: respondToPayerRequest, isPending: isResponsePending } =
    useRespondToSettlementPayerRequestMutation(meetingId);
  const { mutate: revokePayerApproval, isPending: isRevokePending } = useRevokeSettlementPayerMutation(meetingId);
  const { data: isLeader } = useQuery({
    ...useSettlementDetailQueryOption(meetingId),
    select: (settlement) => settlement.isLeader,
  });
  const { data: payerRequests } = useQuery({
    ...useSettlementPayerRequestsQueryOption(meetingId),
    enabled: isLeader === true,
  });
  const { data: approvedPayers } = useQuery({
    ...useSettlementPayersQueryOption(meetingId),
    enabled: isLeader === true,
  });

  const handleReject = (roundId: number, requesterUserId: number) => {
    respondToPayerRequest({ roundId, requesterUserId, action: 'reject' });
  };

  const handleApprove = (roundId: number, requesterUserId: number) => {
    respondToPayerRequest({ roundId, requesterUserId, action: 'approve' });
  };

  if (!isLeader) return null;

  return (
    <SContainer>
      <SLabel>
        <STitle>결제자 요청</STitle>
        <SDescription>승인 시, 참석자 관리 페이지가 승인자에게 공유됩니다.</SDescription>
      </SLabel>
      <SRequestList>
        {payerRequests?.requests.length === 0 && approvedPayers?.payers.length === 0 && (
          <SEmpty>아직 결제자 요청이 없어요.</SEmpty>
        )}

        {payerRequests?.requests.map(({ userId, name, profileImage, roundId, roundNumber }) => (
          <SRequest key={`${roundId}-${userId}`}>
            <Avatar size={32} src={profileImage || undefined} strokeColor='neutralGhost' aria-hidden />
            <SProfile>
              <SName>{name}</SName>
              <SRound>{roundNumber}회차</SRound>
            </SProfile>
            <SButtons>
              <ActionButton
                size={isMobile ? 'small' : 'large'}
                variant='secondary'
                disabled={isResponsePending}
                onClick={() => handleReject(roundId, userId)}
              >
                거절
              </ActionButton>
              <ActionButton
                size={isMobile ? 'small' : 'large'}
                disabled={isResponsePending}
                onClick={() => handleApprove(roundId, userId)}
              >
                승인
              </ActionButton>
            </SButtons>
          </SRequest>
        ))}
      </SRequestList>

      <SApprovedList hasRequests={!!payerRequests?.requests.length}>
        {approvedPayers?.payers.map(({ userId, name, profileImage, roundId, roundNumber }) => (
          <SRequest key={`${roundId}-${userId}`}>
            <Avatar size={32} src={profileImage || undefined} strokeColor='neutralGhost' aria-hidden />
            <SProfile>
              <SName>{name}</SName>
              <SRound>{roundNumber}회차</SRound>
            </SProfile>
            <SApprovedLabel>승인이 완료되었어요.</SApprovedLabel>
            <ActionButton
              size={isMobile ? 'small' : 'large'}
              variant='secondary'
              disabled={isRevokePending}
              onClick={() => revokePayerApproval({ roundId, requesterUserId: userId })}
            >
              승인 취소
            </ActionButton>
          </SRequest>
        ))}
      </SApprovedList>
    </SContainer>
  );
};

export default PayerRequests;

const SContainer = styled('section', {
  'marginTop': spacing.s80,
  '@mobile': {
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

const SRequestList = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s16,
  'marginTop': spacing.s24,
  '@mobile': {
    marginTop: spacing.s10,
  },
});

const SRequest = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s12,
  'padding': `${spacing.s20} ${spacing.s36}`,
  'borderRadius': radius.r20,
  'backgroundColor': colors.bg.neutral.ghost,
  '@mobile': {
    width: '320px',
    gap: spacing.s8,
    padding: spacing.s16,
  },
});

const SButtons = styled('div', {
  'display': 'flex',
  'gap': spacing.s16,
  '@mobile': {
    gap: spacing.s8,
  },
});

const SProfile = styled('div', {
  flex: 1,
  minWidth: 0,
});

const SName = styled('p', {
  ...typography.label2,
  color: colors.fg.neutral.bold,
});

const SRound = styled('p', {
  ...typography.label3,
  color: colors.fg.neutral.subtle,
});

const SApprovedList = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s12,
  'marginTop': spacing.s24,
  '&:empty': {
    display: 'none',
  },
  'variants': {
    hasRequests: {
      true: {
        paddingTop: spacing.s24,
        borderTop: `1px solid ${colors.stroke.neutral.ghost}`,
      },
    },
  },
});

const SApprovedLabel = styled('p', {
  ...typography.label2,
  'color': colors.fg.neutral.subtle,
  'marginRight': '18px',
  'whiteSpace': 'nowrap',
  '@mobile': {
    ...typography.label4,
    marginRight: spacing.s0,
  },
});

const SEmpty = styled('p', {
  ...typography.label2,
  'padding': `${spacing.s40} ${spacing.s36}`,
  'borderRadius': radius.r20,
  'backgroundColor': colors.bg.neutral.ghost,
  'color': colors.fg.neutral.subtle,
  '@mobile': {
    ...typography.label3,
    display: 'flex',
    alignItems: 'center',
    minHeight: '72px',
    padding: `0 ${spacing.s16}`,
  },
});

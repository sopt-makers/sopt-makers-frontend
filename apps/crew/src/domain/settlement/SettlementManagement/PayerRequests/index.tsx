import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton, Avatar } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

// TODO: 결제자 요청 조회 및 승인 API 연동
const payerRequests = [{ userId: 1, name: '장정훈', profileImage: '', roundId: 2, roundNumber: 2 }];

const PayerRequests = () => {
  const { isMobile } = useDisplay();

  return (
    <SContainer>
      <SLabel>
        <STitle>결제자 요청</STitle>
        <SDescription>승인 시, 참석자 관리 페이지가 승인자에게 공유됩니다.</SDescription>
      </SLabel>
      <SList>
        {payerRequests.map(({ userId, name, profileImage, roundId, roundNumber }) => (
          <SRequest key={`${roundId}-${userId}`}>
            <Avatar size={32} src={profileImage || undefined} strokeColor='neutralGhost' aria-hidden />
            <SProfile>
              <SName>{name}</SName>
              {roundNumber !== undefined && <SRound>{roundNumber}회차</SRound>}
            </SProfile>
            <SButtons>
              <ActionButton
                size={isMobile ? 'small' : 'large'}
                variant='secondary'
                onClick={() => {
                  // @TODO: 결제자 요청 거절 API 연동 (장정훈)
                }}
              >
                거절
              </ActionButton>
              <ActionButton
                size={isMobile ? 'small' : 'large'}
                onClick={() => {
                  // @TODO: 결제자 요청 승인 API 연동 (장정훈)
                }}
              >
                승인
              </ActionButton>
            </SButtons>
          </SRequest>
        ))}
      </SList>
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

const SList = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s12,
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

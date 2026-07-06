import { useSwitchMeetingDemandWaitMutation } from '@api/meetingDemand/mutation';
import { useMeetingDemandListInfiniteQueryOption } from '@api/meetingDemand/query';
import { useDisplay } from '@hook/useDisplay';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { Suspense } from '@suspensive/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

import CardList from '../CardList';

interface SuggestSectionProps {
  title: string;
  description: string;
}

const SuggestSectionContent = ({ title, description }: SuggestSectionProps) => {
  const { isMobile } = useDisplay();
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    useMeetingDemandListInfiniteQueryOption(),
  );
  const { mutate: switchMeetingDemandWait } = useSwitchMeetingDemandWaitMutation();

  const handleCardClick = (meetingDemandId: number) => {
    // @TODO: 모임 제안 상세 페이지 경로 확정 후 meetingDemandId에 해당하는 상세 페이지로 이동
    void meetingDemandId;
  };

  const handleWaitingChange = (meetingDemandId: number) => {
    switchMeetingDemandWait(meetingDemandId);
  };

  const handleSuggestClick = () => {
    router.push('/suggest');
  };

  return (
    <Container>
      <Header>
        <Introduction>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Introduction>

        {!isMobile && (
          <DesktopCTA>
            <DesktopCTAText>원하는 모임이 없다면?</DesktopCTAText>
            <ActionButton size='medium' variant='primary' onClick={handleSuggestClick}>
              모임 제안하기
            </ActionButton>
          </DesktopCTA>
        )}
      </Header>

      <CardList
        pages={data.pages}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onFetchNextPage={fetchNextPage}
        onCardClick={handleCardClick}
        onWaitingChange={handleWaitingChange}
      />

      {isMobile && (
        <MobileCTA>
          <MobileCTAText>
            <MobileCTATitle>원하는 모임이 없다면 직접 남겨보세요!</MobileCTATitle>
            <MobileCTADescription>비슷한 생각이 모이면, 관심 있는 멤버가 모임을 열 수 있어요</MobileCTADescription>
          </MobileCTAText>
          <ActionButton size='large' variant='primary' onClick={handleSuggestClick}>
            모임 제안하기
          </ActionButton>
        </MobileCTA>
      )}
    </Container>
  );
};

const SuggestSection = (props: SuggestSectionProps) => {
  return (
    <Suspense fallback={null}>
      <SuggestSectionContent {...props} />
    </Suspense>
  );
};

export default SuggestSection;

const Container = styled('section', {
  'marginBottom': spacing.s80,

  '@mobile': {
    marginBottom: spacing.s40,
  },
});

const Header = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'marginBottom': spacing.s28,

  '@mobile': {
    marginBottom: spacing.s16,
  },
});

const Introduction = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s2,
});

const Title = styled('h2', {
  'color': colors.fg.neutral.bold,
  ...typography.heading2,

  '@mobile': {
    ...typography.title4,
  },
});

const Description = styled('p', {
  'color': colors.fg.neutral.subtle,
  ...typography.body1,

  '@mobile': {
    ...typography.body2,
  },
});

const DesktopCTA = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.s16,
});

const DesktopCTAText = styled('p', {
  color: colors.fg.neutral.default,
  ...typography.label2,
});

const MobileCTA = styled('div', {
  display: 'flex',
  padding: `0 0 ${spacing.s20}`,
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.s24,
  margin: `${spacing.s32} 0 0`,
});

const MobileCTAText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.s4,
  textAlign: 'center',
});

const MobileCTATitle = styled('p', {
  color: colors.fg.neutral.bold,
  ...typography.title4,
});

const MobileCTADescription = styled('p', {
  color: colors.fg.neutral.subtle,
  ...typography.body2,
});

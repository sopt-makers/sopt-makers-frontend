import { useDisplay } from '@hook/useDisplay';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styled } from 'stitches.config';

import CardList from '../CardList';
import type { MeetingDemandPageData } from '../types';

// @TODO: 모임 제안 목록 조회 API 연동
const MOCK_MEETING_DEMAND_PAGES: MeetingDemandPageData[] = [
  {
    meetingDemands: [
      {
        id: 1,
        shortIntro: '러닝크루 스터디를 원해요! 넘어가면 말줄임 표시',
        expectation: '본문 내용 들어가고 영역 넘어가면 말줄임 표시 이렇게 잘릴라나',
        status: 'BEFORE_OPEN',
        waitCount: 4,
        isWaiting: false,
      },
      {
        id: 2,
        shortIntro: '러닝크루 스터디를 원해요! 넘어가면 말줄임 표시',
        expectation: '본문 내용 들어가고 영역 넘어가면 말줄임 표시 이렇게 잘릴라나',
        status: 'BEFORE_OPEN',
        waitCount: 5,
        isWaiting: true,
      },
      {
        id: 3,
        shortIntro: '러닝크루 스터디를 원해요! 넘어가면 말줄임 표시',
        expectation: '본문 내용 들어가고 영역 넘어가면 말줄임 표시 이렇게 잘릴라나',
        status: 'OPENED',
        waitCount: 4,
        isWaiting: false,
      },
    ],
    meta: {
      page: 0,
      take: 3,
      itemCount: 3,
      pageCount: 2,
      hasPreviousPage: false,
      hasNextPage: true,
    },
  },
  {
    meetingDemands: [
      {
        id: 4,
        shortIntro: '러닝크루 스터디를 원해요! 넘어가면 말줄임 표시',
        expectation: '본문 내용 들어가고 영역 넘어가면 말줄임 표시 이렇게 잘릴라나',
        status: 'OPENED',
        waitCount: 5,
        isWaiting: true,
      },
    ],
    meta: {
      page: 1,
      take: 3,
      itemCount: 1,
      pageCount: 2,
      hasPreviousPage: true,
      hasNextPage: false,
    },
  },
];

interface SuggestSectionProps {
  title: string;
  description: string;
}

const SuggestSection = ({ title, description }: SuggestSectionProps) => {
  const { isMobile } = useDisplay();
  const router = useRouter();
  const [meetingDemandPages, setMeetingDemandPages] = useState(MOCK_MEETING_DEMAND_PAGES);

  const handleCardClick = (meetingDemandId: number) => {
    router.push(`/suggest/detail?id=${meetingDemandId}`);
  };

  const handleWaitingChange = (meetingDemandId: number, isWaiting: boolean) => {
    // @TODO: 기다려요 수 증감 API 연동 후 서버 응답으로 상태 갱신
    setMeetingDemandPages((currentPages) =>
      currentPages.map((page) => ({
        ...page,
        meetingDemands: page.meetingDemands.map((meetingDemand) =>
          meetingDemand.id === meetingDemandId
            ? {
                ...meetingDemand,
                isWaiting,
                waitCount: meetingDemand.waitCount + (isWaiting ? 1 : -1),
              }
            : meetingDemand,
        ),
      })),
    );
  };

  const handleSuggestClick = () => {
    // @TODO: 모임 제안 등록 페이지 경로 연동
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

      <CardList pages={meetingDemandPages} onCardClick={handleCardClick} onWaitingChange={handleWaitingChange} />

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

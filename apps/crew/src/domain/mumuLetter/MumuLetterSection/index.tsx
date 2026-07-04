import Letter from '@assets/svg/letter.svg';
import PaperAirplane from '@assets/svg/paper_airplane.svg';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { Suspense } from '@suspensive/react';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

import MumuFeedCardList from '../MumuFeedCardList';
import type { MumuLetterSectionData } from '../types';

// @TODO: 홈 무무씨의 편지 조회 API 연동 후 Mock 데이터 제거
const MOCK_MUMU_LETTER_HOME_DATA: MumuLetterSectionData = {
  isEmptyAppliedMeeting: false,
  hasWrittenTodayMumuPost: false,
  mumuText: '스터디를 참여하면서 가장 좋았던 순간은 무엇이었음메메메메메?',
  mumuPostHomeDtos: [
    {
      meetingId: 1,
      meetingTitle: '크루 추억쌓기 크루 초장문 모임 제목',
      meetingCategory: 'STUDY',
      postId: 1,
      likeCount: 2,
      isLiked: true,
      commentCount: 0,
      title: '[불펌] I am 회고예요',
      content: 'cr-all 늦은 시간 회고하느라 고생 많았어~! 항상 즐겁게 협업하기',
    },
    {
      meetingId: 2,
      meetingTitle: '함께 만드는 사이드 프로젝트',
      meetingCategory: 'STUDY',
      postId: 2,
      likeCount: 3,
      isLiked: false,
      commentCount: 1,
      title: '가장 기억에 남는 순간',
      content: '서로의 고민을 나누면서 같이 성장할 수 있어서 좋았어요.',
    },
    {
      meetingId: 3,
      meetingTitle: '솝트 문화 행사 준비',
      meetingCategory: 'EVENT',
      postId: 3,
      likeCount: 5,
      isLiked: true,
      commentCount: 2,
      title: '함께해서 즐거웠어요',
      content: '모임 멤버들과 결과물을 완성했던 순간이 가장 기억에 남아요.',
    },
  ],
};

interface MumuLetterSectionProps {
  title: string;
  description: string;
}

const MumuLetterSectionContent = ({ title, description }: MumuLetterSectionProps) => {
  const router = useRouter();
  const { hasWrittenTodayMumuPost: isReplied, mumuText, mumuPostHomeDtos } = MOCK_MUMU_LETTER_HOME_DATA;

  const handleReplyClick = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          modal: 'create-feed',
          entry: 'mumu',
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleViewAllClick = () => {
    window.location.assign('/feed');
  };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Header>

      <LetterContainer>
        <QuestionArea>
          <QuestionMessage>
            <MumuProfile>
              <SMumuImage src='/group/assets/svg/mumu.svg' alt='' />
              <AvatarName>무무</AvatarName>
            </MumuProfile>

            <QuestionBody>
              <DeliveryStatus>
                {isReplied ? <SPaperAirplane /> : <SLetter />}
                {isReplied ? '답장 배달 완료' : '오늘의 질문 배달'}
              </DeliveryStatus>

              <DeliveryQuestion completed={isReplied}>
                {isReplied ? '오늘의 답장을 배달했움메!\n내일 다시 오겠움메 ><' : mumuText}
              </DeliveryQuestion>
            </QuestionBody>
          </QuestionMessage>

          <SActionButton
            size='medium'
            variant='primary'
            highlighted={!isReplied}
            onClick={isReplied ? handleViewAllClick : handleReplyClick}
          >
            {isReplied ? '피드 전체 보러가기' : '답장 피드 남기기'}
          </SActionButton>
        </QuestionArea>

        <div>
          <ReplyFeedTitle>
            내 모임 답장 피드
            {isReplied && <ReplyFeedCount>{mumuPostHomeDtos.length}</ReplyFeedCount>}
          </ReplyFeedTitle>

          {isReplied ? (
            <MumuFeedCardList posts={mumuPostHomeDtos} />
          ) : (
            <EmptyDescription>모임 멤버의 답장 피드가 여기에 나타나요</EmptyDescription>
          )}
        </div>
      </LetterContainer>
    </Container>
  );
};

const MumuLetterSection = (props: MumuLetterSectionProps) => {
  return (
    <Suspense fallback={null}>
      <MumuLetterSectionContent {...props} />
    </Suspense>
  );
};

export default MumuLetterSection;

const Container = styled('section', {
  'marginBottom': spacing.s80,

  '@mobile': {
    marginBottom: spacing.s40,
  },
});

const Header = styled('header', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s2,
  'marginBottom': spacing.s28,

  '@mobile': {
    marginBottom: spacing.s16,
  },
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
    ...typography.label3,
  },
});

const LetterContainer = styled('div', {
  'display': 'flex',
  'padding': spacing.s40,
  'borderRadius': radius.r20,
  'backgroundColor': colors.bg.neutral.ghost,
  'flexDirection': 'column',
  'gap': spacing.s40,
  'overflow': 'hidden',

  '@mobile': {
    padding: `${spacing.s24} ${spacing.s20}`,
    gap: spacing.s32,
  },
});

const QuestionArea = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'gap': spacing.s36,

  '@mobile': {
    gap: spacing.s24,
  },
});

const QuestionMessage = styled('div', {
  'display': 'flex',
  'width': '100%',
  'alignItems': 'center',
  'gap': spacing.s12,

  '@mobile': {
    alignItems: 'flex-end',
  },
});

const MumuProfile = styled('div', {
  display: 'flex',
  flexShrink: 0,
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.s8,
});

const SMumuImage = styled('img', {
  'display': 'block',
  'width': '80px',
  'height': 'auto',

  '@mobile': {
    width: '48px',
  },
});

const AvatarName = styled('span', {
  'color': colors.fg.neutral.default,
  ...typography.label1,

  '@mobile': {
    ...typography.label4,
  },
});

const QuestionBody = styled('div', {
  display: 'flex',
  minWidth: 0,
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing.s12,
});

const DeliveryStatus = styled('div', {
  'display': 'inline-flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'padding': `${spacing.s8} ${spacing.s16}`,
  'backgroundColor': colors.bg.neutral.subtle,
  'borderRadius': `${radius.r12} ${radius.r12} ${radius.r12} ${radius.r0}`,
  'color': colors.fg.neutral.bold,
  'whiteSpace': 'nowrap',
  ...typography.label1,

  '@mobile': {
    padding: `${spacing.s6} ${spacing.s12}`,
    ...typography.label4,
  },
});

const SPaperAirplane = styled(PaperAirplane, {
  width: 'auto',
  height: '16px',
  flexShrink: 0,
});

const SLetter = styled(Letter, {
  width: '24px',
  height: '14px',
  flexShrink: 0,
});

const DeliveryQuestion = styled('p', {
  'boxSizing': 'border-box',

  'padding': `${spacing.s14} ${spacing.s20}`,
  'border': `1px solid ${colors.stroke.brand.default}`,
  'borderRadius': radius.r8,
  'color': colors.fg.brand.default,
  'backgroundColor': colors.bg.neutral.subtle,
  ...typography.title3,

  '@mobile': {
    width: '100%',
    padding: `${spacing.s12} ${spacing.s16}`,
    ...typography.body1,
  },

  'variants': {
    completed: {
      true: {
        'borderColor': colors.stroke.neutral.default,
        'color': colors.fg.neutral.bold,
        'whiteSpace': 'nowrap',

        '@mobile': {
          whiteSpace: 'pre-line',
        },
      },
    },
  },
});

const SActionButton = styled(ActionButton, {
  variants: {
    highlighted: {
      true: {
        backgroundColor: `${colors.bg.brand.default} !important`,
        color: `${colors.fg.neutral.bold} !important`,
      },
    },
  },
});

const ReplyFeedTitle = styled('h3', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s4,
  ...typography.heading3,
  'color': colors.fg.neutral.bold,

  '@mobile': {
    ...typography.title5,
  },
});

const ReplyFeedCount = styled('span', {
  color: colors.fg.brand.default,
});

const EmptyDescription = styled('p', {
  'color': colors.fg.neutral.subtle,
  ...typography.body1,

  '@mobile': {
    ...typography.body2,
  },
});

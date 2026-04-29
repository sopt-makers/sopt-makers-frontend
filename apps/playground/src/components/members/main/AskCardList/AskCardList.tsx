import styled from '@emotion/styled';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  type MembersQuestionType,
  useGetMembersQuestionsLatest,
} from '@/api/endpoint/members/getMembersQuestionsLatest';
import Carousel from '@/components/common/Carousel';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import AskCard from '../AskCard/AskCard';

const DESKTOP_CARD_LIMIT = 3;

const AskCardList = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { data: askData } = useGetMembersQuestionsLatest();

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MEDIA_QUERY);
    setIsMobile(media.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const { logClickEvent } = useEventLogger();
  const handleAnswerClick = (question: MembersQuestionType) => {
    logClickEvent('askContentCard', { id: question.receiverId, name: question.receiverName, referral: 'ask_content' });
    router.push({
      pathname: `/members/${question.receiverId}`,
      query: {
        tab: 'ask',
        questionTab: 'answered',
        scrollPage: question.location.page + 1,
        scrollIndex: question.location.index,
      },
    });
  };

  return (
    <StyledContainer>
      <StyledTitle>요즘 이런 질문이 오가고 있어요</StyledTitle>
      <Carousel
        isArrow={!isMobile}
        itemList={
          askData?.questions.map((question) => (
            <AskCard
              key={question.questionId}
              memberId={question.receiverId}
              profileName={question.receiverName}
              askContent={question.content}
              profileImageUrl={question.receiverProfileImage ?? undefined}
              onAnswerClick={() => handleAnswerClick(question)}
            />
          )) ?? []
        }
        limit={isMobile ? 1 : DESKTOP_CARD_LIMIT}
        renderItemContainer={(children) => <StyledCarouselItem>{children}</StyledCarouselItem>}
      />
    </StyledContainer>
  );
};

export default AskCardList;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
  }
`;

const StyledTitle = styled.div`
  ${fonts.HEADING_24_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_16_B}
  }
`;

const StyledCarouselItem = styled.div`
  display: grid;
  grid-template-columns: repeat(${DESKTOP_CARD_LIMIT}, 1fr);
  gap: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: 1fr;
  }
`;

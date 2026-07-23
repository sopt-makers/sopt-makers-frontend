import styled from '@emotion/styled';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import {
  type MembersQuestionType,
  useGetMembersQuestionsLatest,
} from '@/api/endpoint/members/getMembersQuestionsLatest';
import Carousel from '@/components/common/Carousel';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import AskCard from '../AskCard/AskCard';

const DESKTOP_CARD_LIMIT = 3;
const MOBILE_CARD_LIMIT = 1;

const AskCardList = () => {
  const router = useRouter();
  const { logClickEvent } = useEventLogger();
  const handleAnswerClick = (question: MembersQuestionType) => {
    logClickEvent('askContentCard', { id: question.receiverId, name: question.receiverName });
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

  const { data: askData } = useGetMembersQuestionsLatest();
  const askCardList =
    askData?.questions.map((question) => (
      <AskCard
        key={question.questionId}
        memberId={question.receiverId}
        profileName={question.receiverName}
        askContent={question.content}
        profileImageUrl={question.receiverProfileImage ?? undefined}
        onAnswerClick={() => handleAnswerClick(question)}
      />
    )) ?? [];

  const renderItemContainer = (children: ReactNode) => <StyledCarouselItem>{children}</StyledCarouselItem>;

  return (
    <StyledContainer>
      <StyledTitle>요즘 이런 질문이 오가고 있어요</StyledTitle>
      <Responsive only='desktop'>
        <Carousel isArrow itemList={askCardList} limit={DESKTOP_CARD_LIMIT} renderItemContainer={renderItemContainer} />
      </Responsive>
      <Responsive only='mobile'>
        <Carousel
          isArrow={false}
          itemList={askCardList}
          limit={MOBILE_CARD_LIMIT}
          renderItemContainer={renderItemContainer}
        />
      </Responsive>
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

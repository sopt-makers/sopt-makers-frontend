import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { useGetPopularPost } from '@/api/endpoint/feed/getPopularPost';
import PopularCard from '@/components/common/PopularCard';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { MB_SM_MEDIA_QUERY } from '@/styles/mediaQuery';

const PopularArea = () => {
  const { data, isLoading, isError } = useGetPopularPost();

  // @TODO: 상세 페이지 이동 로직 구현
  // const handleClickCard = () => {}

  return (
    <Container>
      <TitleWrapper>
        <Text typography='SUIT_18_B' color={colors.white} lineHeight={28}>
          실시간 인기글
        </Text>
      </TitleWrapper>
      <ContentWrapper>
        {isError && (
          <Text
            typography='SUIT_14_M'
            color={colors.gray300}
            lineHeight={16}
            style={{ textAlign: 'center', padding: '80px' }}
          >
            인기글을 보여주는데 문제가 발생했어요.
          </Text>
        )}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <PopularCard key={`skeleton-${index}`} rank={index + 1} isLoading />
          ))}
        {data?.map((card, index) => (
          <LoggingClick
            eventKey='feedCard'
            param={{
              feedId: String(card.id),
              category: card.categoryTagLabel,
              referral: 'category_HOT',
            }}
            key={card.id ?? index}
          >
            <PopularCard
              rank={index + 1}
              card={card}
              // onClick={handleClickCard} TODO 구현 시 추가
              onClick={() => {}}
            />
          </LoggingClick>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default PopularArea;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  width: 100%;
`;

const TitleWrapper = styled.h1`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;

  @media ${MB_SM_MEDIA_QUERY} {
    flex-direction: column;
    align-items: start;
  }
`;

const ContentWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

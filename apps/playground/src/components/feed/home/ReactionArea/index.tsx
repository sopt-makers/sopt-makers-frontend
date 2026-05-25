import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { useGetPopularPost } from '@/api/endpoint/feed/getPopularPost';
import PopularCard from '@/components/common/PopularCard';
import Text from '@/components/common/Text';

const ReactionArea = () => {
  const { data, isError, isLoading } = useGetPopularPost();

  // @TODO: 상세 페이지 이동 로직 추가
  // const handleClickCard = () => {}

  return (
    <StyledContainer>
      <TitleWrapper>
        <Text typography='SUIT_18_B' color={colors.white} lineHeight={28}>
          <HighLightText>최근 30일간</HighLightText>
        </Text>
        <Text typography='SUIT_18_B' color={colors.white} lineHeight={28}>
          가장 많은 반응을 받은 글이에요!
        </Text>
      </TitleWrapper>
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
      <StyledCardListContainer>
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <PopularCard key={`skeleton-${index}`} rank={index + 1} isLoading isProfile />
          ))}
        {data?.map((card, index) => (
          <PopularCard
            rank={index + 1}
            key={card.id}
            card={card}
            // TODO: 상세 페이지 이동 로직 연결
            // onClick={() => {}}
            isProfile
          />
        ))}
      </StyledCardListContainer>
    </StyledContainer>
  );
};

export default ReactionArea;

const StyledContainer = styled.div`
  padding: 0 16px;
`;

const TitleWrapper = styled.h1`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`;

const HighLightText = styled.span`
  color: ${colors.secondary};
`;

const StyledCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

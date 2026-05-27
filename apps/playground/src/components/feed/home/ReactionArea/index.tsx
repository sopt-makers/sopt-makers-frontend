import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';

import type { PopularPostType } from '@/api/endpoint/feed/getPopularPost';
import { useGetPopularPost } from '@/api/endpoint/feed/getPopularPost';
import PopularCard from '@/components/common/PopularCard';
import Text from '@/components/common/Text';

const SUB_CATEGORY_CODE = {
  PROMOTION: ['RECRUIT', 'PROJECT', 'ETC', 'EVENT'],
  SOPTICLE: ['PLAN', 'DESIGN', 'WEB', 'SERVER', 'IOS', 'ANDROID'],
};

const getCategoryAndSubcategory = (value: string): [string, string | undefined] => {
  for (const [category, subCategories] of Object.entries(SUB_CATEGORY_CODE)) {
    if (subCategories.includes(value)) {
      return [category, value];
    }
  }
  return [value, undefined];
};

const ReactionArea = () => {
  const { data, isError, isLoading } = useGetPopularPost();
  const router = useRouter();

  const handleClickCard = (card: PopularPostType[number]) => {
    const [category, subcategory] = getCategoryAndSubcategory(card.categoryTag);
    router.push({
      pathname: playgroundLink.feedList(),
      query: {
        category,
        ...(subcategory ? { subcategory } : {}),
        feed: card.id,
      },
    });
  };

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
            <PopularCard key={`skeleton-${index}`} rank={index + 1} variant='withProfile' />
          ))}
        {data?.map((card, index) => (
          <PopularCard
            rank={index + 1}
            key={card.id}
            card={card}
            variant='withProfile'
            onClick={() => handleClickCard(card)}
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

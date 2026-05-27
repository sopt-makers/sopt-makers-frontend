import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';

import type { PopularPostType } from '@/api/endpoint/feed/getPopularPost';
import { useGetPopularPost } from '@/api/endpoint/feed/getPopularPost';
import PopularCard from '@/components/common/PopularCard';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { getCategoryAndSubcategory } from '@/components/feed/common/utils/getCategoryAndSubcategory';

import TitledContent from '../common/TitledContent';

const PopularArea = () => {
  const { data, isLoading, isError } = useGetPopularPost();

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
    <TitledContent title='실시간 인기글'>
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
          Array.from({ length: 3 }).map((_, index) => <PopularCard key={`skeleton-${index}`} rank={index + 1} />)}
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
            <PopularCard rank={index + 1} card={card} onClick={() => handleClickCard(card)} />
          </LoggingClick>
        ))}
      </ContentWrapper>
    </TitledContent>
  );
};

export default PopularArea;

const ContentWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

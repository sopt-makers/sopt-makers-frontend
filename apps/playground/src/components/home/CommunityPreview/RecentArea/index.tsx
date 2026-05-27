import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { useRouter } from 'next/router';

import { useRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import ScrollCarousel from '@/components/common/ScrollCarousel';
import { getCategoryAndSubcategory } from '@/components/feed/common/utils/getCategoryAndSubcategory';
import RecentCard from '@/components/feed/home/RecentArea/RecentCard';
import { getLoopedItems } from '@/hooks/useScrollCarousel';
import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY } from '@/styles/mediaQuery';

import TitledContent from '../../common/TitledContent';

const ITEMS_PER_VIEW = 1;

const RecentArea = () => {
  const { data: recentPosts = [] } = useRecentPosts();
  const router = useRouter();

  const handleClickCard = (categoryTag: string, id: number) => {
    const [category, subcategory] = getCategoryAndSubcategory(categoryTag);
    router.push({
      pathname: playgroundLink.feedList(),
      query: {
        category,
        ...(subcategory ? { subcategory } : {}),
        feed: id,
      },
    });
  };

  return (
    <TitledContent title='새로 올라온 글'>
      {/* ~1200: 캐러셀 (모바일 1장 / 태블릿 2장) */}
      <CarouselWrapper>
        <ScrollCarousel itemCount={recentPosts.length} itemsPerView={ITEMS_PER_VIEW} autoPlay={{ enabled: false }}>
          {getLoopedItems(recentPosts, ITEMS_PER_VIEW).map((recentPost, index) => (
            <RecentCard
              key={`${recentPost.id}-${index}`}
              recentPost={recentPost}
              onClick={() => handleClickCard(recentPost.categoryTag, recentPost.id)}
            />
          ))}
        </ScrollCarousel>
      </CarouselWrapper>

      {/* 1200~: 캐러셀 없이 카드 3장 고정 */}
      <StaticGrid>
        {recentPosts.map((recentPost) => (
          <RecentCard
            key={`static-${recentPost.id}`}
            recentPost={recentPost}
            onClick={() => handleClickCard(recentPost.categoryTag, recentPost.id)}
          />
        ))}
      </StaticGrid>
    </TitledContent>
  );
};

export default RecentArea;

const CarouselWrapper = styled.div`
  display: none;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: block;
    width: 100%;
  }
`;

const StaticGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;

  & > *:nth-of-type(n + 4) {
    display: none; /* 3장만 노출 */
  }

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > *:nth-of-type(n + 3) {
      display: none; /* 3장만 노출 */
    }
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: none;
  }
`;

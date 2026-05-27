import styled from '@emotion/styled';

import { useGetMemberProperty } from '@/api/endpoint/members/getMemberProperty';
import { type RandomCoffeeChat, useGetRandomCoffeeChat } from '@/api/endpoint/menuPreview/getRandomCoffeeChat';
import CoffeeChatCard from '@/components/coffeechat/CoffeeChatCard';
import ScrollCarousel from '@/components/common/ScrollCarousel';
import useMediaQuery from '@/hooks/useMediaQuery';
import { getLoopedItems } from '@/hooks/useScrollCarousel';
import { DESKTOP_TWO_MEDIA_QUERY, MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';

import TitledContent from '../common/TitledContent';
import CoffeeChatPreviewSkeleton from './CoffeeChatPreviewSkeleton';

const SKELETON_CARD_COUNT = 3;

const toCardProps = (c: RandomCoffeeChat) => ({
  id: String(c.memberId),
  title: c.coffeeChatBio,
  topicTypeList: c.topicTypeList,
  profileImage: c.profileImage ?? '',
  name: c.name,
  career: c.career,
  organization: c.organization ?? '',
  companyJob: c.companyJob ?? undefined,
  soptActivities: c.soptActivities,
});

const CoffeeChatPreview = () => {
  const { data: myProperty, isLoading: isMemberDataLoading } = useGetMemberProperty();
  const { data: coffeeChats = [], isLoading: isCoffeeChatDataLoading } = useGetRandomCoffeeChat();

  const isLoading = isMemberDataLoading || isCoffeeChatDataLoading;
  const parts = myProperty?.part ?? [];
  const lastRealPart = [...parts].reverse().find((p) => p !== '메이커스');

  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const itemsPerView = isMobile ? 1 : 2;

  if (isLoading) {
    return <CoffeeChatPreviewSkeleton count={SKELETON_CARD_COUNT} />;
  }

  return (
    <TitledContent title={`${lastRealPart} 멤버와 이야기를 나눠보세요!`}>
      {/* ~1200: 캐러셀 (모바일 1장 / 태블릿 2장) */}
      <CarouselWrapper>
        <ScrollCarousel
          itemCount={coffeeChats.length}
          itemsPerView={itemsPerView}
          autoPlay={{ enabled: true, interval: 3000 }}
        >
          {getLoopedItems(coffeeChats, itemsPerView).map((coffeeChat, index) => (
            <CoffeeChatCard key={`${coffeeChat.memberId}-${index}`} {...toCardProps(coffeeChat)} />
          ))}
        </ScrollCarousel>
      </CarouselWrapper>

      {/* 1200~: 캐러셀 없이 카드 3장 고정 */}
      <StaticGrid>
        {coffeeChats.map((coffeeChat) => (
          <CoffeeChatCard key={`static-${coffeeChat.memberId}`} {...toCardProps(coffeeChat)} />
        ))}
      </StaticGrid>
    </TitledContent>
  );
};

export default CoffeeChatPreview;

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

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: none;
  }
`;

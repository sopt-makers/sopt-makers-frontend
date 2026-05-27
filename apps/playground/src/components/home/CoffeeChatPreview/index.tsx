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

// TODO: 서버 500 복구되면 제거
const DUMMY_COFFEE_CHATS: RandomCoffeeChat[] = [
  {
    memberId: 1,
    coffeeChatBio: '프론트엔드 커리어 시작이 막막한 분, 편하게 이야기 나눠요',
    profileImage: 'https://i.pravatar.cc/200?img=1',
    name: '김솝트',
    career: '3년차',
    organization: '토스',
    companyJob: '프론트엔드 엔지니어',
    soptActivities: ['33기 기획', '32기 디자인', '31기 서버'],
  },
  {
    memberId: 2,
    coffeeChatBio: 'PM으로 전향한 개발자, 궁금한 것 다 물어보세요',
    profileImage: 'https://i.pravatar.cc/200?img=2',
    name: '이메이커스',
    career: '5년차',
    organization: '네이버',
    companyJob: 'Product Manager',
    soptActivities: ['30기 서버', '29기 기획'],
  },
  {
    memberId: 3,
    coffeeChatBio: '디자인 시스템 운영하면서 배운 것들 공유해드려요',
    profileImage: 'https://i.pravatar.cc/200?img=3',
    name: '박플레이',
    career: '2년차',
    organization: '카카오',
    companyJob: 'Product Designer',
    soptActivities: ['33기 디자인'],
  },
  {
    memberId: 4,
    coffeeChatBio: '대학생 → 신입 백엔드 입사기, 면접 후기까지',
    profileImage: 'https://i.pravatar.cc/200?img=4',
    name: '최그라운드',
    career: '1년차',
    organization: '당근',
    companyJob: '백엔드 엔지니어',
    soptActivities: ['33기 서버', '32기 서버'],
  },
];

const toCardProps = (c: RandomCoffeeChat) => ({
  id: String(c.memberId),
  title: c.coffeeChatBio,
  topicTypeList: [],
  profileImage: c.profileImage,
  name: c.name,
  career: c.career,
  organization: c.organization,
  companyJob: c.companyJob,
  soptActivities: c.soptActivities,
});

const CoffeeChatPreview = () => {
  const { data: myProperty, isLoading: isMemberDataLoading } = useGetMemberProperty();
  const { data: coffeeChats = DUMMY_COFFEE_CHATS, isLoading: isCoffeeChatDataLoading } = useGetRandomCoffeeChat();

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

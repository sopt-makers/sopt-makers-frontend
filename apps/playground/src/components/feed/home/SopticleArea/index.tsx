import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';

import { useRecentSopticles } from '@/api/endpoint/feed/getRecentSopticle';
import ScrollCarousel from '@/components/common/ScrollCarousel';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import SopticleCard from '@/components/feed/home/SopticleArea/SopticleCard';
import FeedSkeleton from '@/components/feed/list/FeedSkeleton';

const SopticleArea = () => {
  const router = useRouter();
  const { data: sopticles = [], isLoading, isError } = useRecentSopticles();

  const navigateToSopticle = () => {
    router.push(`/?category=${SOPTICLE_CATEGORY_ID}`);
  };

  return (
    <Container>
      <TitleBox>
        <Title>따끈따끈한 솝티클이 업로드 됐어요✨</Title>
        <AllBtn onClick={navigateToSopticle}>전체보기</AllBtn>
      </TitleBox>

      {isError && (
        <Text
          typography='SUIT_14_M'
          color={colors.gray300}
          lineHeight={16}
          style={{ textAlign: 'center', padding: '80px' }}
        >
          솝티클을 보여주는데 문제가 발생했어요.
        </Text>
      )}
      {isLoading ? (
        <FeedSkeleton count={1} />
      ) : (
        <ScrollCarousel
          items={sopticles}
          autoSlideInterval={4000}
          renderItem={(sopticle) => (
            <LoggingClick
              eventKey='feedCard'
              param={{
                feedId: String(sopticle.id),
                category: '솝티클',
                referral: 'category_HOT',
              }}
            >
              <SopticleCard sopticle={sopticle} />
            </LoggingClick>
          )}
        />
      )}
    </Container>
  );
};

export default SopticleArea;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 16px;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Text)`
  ${fonts.HEADING_18_B};

  word-break: keep-all;
`;

const AllBtn = styled.button`
  ${fonts.LABEL_12_SB};

  color: ${colors.gray400};

  &:hover {
    box-shadow: inset 0 -1px 0 0 ${colors.gray400};
  }
`;

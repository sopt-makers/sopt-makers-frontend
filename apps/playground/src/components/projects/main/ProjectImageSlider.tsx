import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styled from '@emotion/styled';
import { IconChevronLeft, IconChevronRight } from '@sopt-makers/icons';
import { colors } from '@sopt-mds/design-tokens';
import { useRef, useState } from 'react';
import { Navigation, Thumbs } from 'swiper';
import type { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Responsive from '@/components/common/Responsive';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ProjectImageSliderProps {
  images: string[];
  className?: string;
}
const ProjectImageSlider = ({ images, className }: ProjectImageSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const prevButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  return (
    <Container className={className}>
      <MainSwiperWrapper>
        <Responsive only='desktop'>
          <PrevNavigationButton ref={prevButton}>
            <IconChevronLeft />
          </PrevNavigationButton>
          <NextNavigationButton ref={nextButton}>
            <IconChevronRight />
          </NextNavigationButton>
        </Responsive>
        <StyledSwiper
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          navigation={
            isMobile
              ? false
              : {
                  nextEl: nextButton.current,
                  prevEl: prevButton.current,
                }
          }
        >
          {images.map((image, index) => (
            <StyledSwiperSlide key={index}>
              <img src={image} alt={image} />
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>
      </MainSwiperWrapper>
      <ThumbsSwiper spaceBetween={isMobile ? 8 : 20} slidesPerView='auto' onSwiper={setThumbsSwiper} modules={[Thumbs]}>
        {images.map((image, index) => (
          <ThumbsSwiperSlide key={index}>
            <img src={image} alt={image} />
          </ThumbsSwiperSlide>
        ))}
        {/* <Dimmed /> */}
      </ThumbsSwiper>
    </Container>
  );
};

export default ProjectImageSlider;

const Container = styled.div`
  & .swiper-button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MainSwiperWrapper = styled.div`
  position: relative;
`;

const PrevNavigationButton = styled.button`
  position: absolute;
  top: 50%;
  left: -80px;

  & svg {
    width: 64px;
    height: 64px;
    color: ${colors.fg.neutral.bold};
  }
`;

const NextNavigationButton = styled.button`
  position: absolute;
  top: 50%;
  right: -80px;

  & svg {
    width: 64px;
    height: 64px;
    color: ${colors.fg.neutral.bold};
  }
`;

const StyledSwiper = styled(Swiper)`
  border-radius: 12px;
  height: 675px;

  & .swiper-button-prev,
  .swiper-button-next {
    color: ${colors.fg.neutral.defaultDisabled};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    height: 210px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbsSwiper = styled(Swiper)`
  margin-top: 30px;

  & .swiper-slide {
    opacity: 0.4;
    cursor: pointer;

    img {
      border-radius: 6px;
    }
  }

  & .swiper-slide-thumb-active {
    opacity: 1;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 14px;
  }
`;

// const Dimmed = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   z-index: 1;
//   background: linear-gradient(270deg, #0f1010 0%, rgb(15 16 16 / 0%) 107.85%);
//   width: 150px;
//   height: 100%;

//   @media ${MOBILE_MEDIA_QUERY} {
//     right: -4px;
//     width: 30px;
//   }
// `;

const ThumbsSwiperSlide = styled(SwiperSlide)`
  width: 238px;
  height: 132px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 94px;
    height: 53px;
  }
`;

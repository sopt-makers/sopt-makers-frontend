import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Children, type ReactNode } from 'react';

import { useScrollCarousel, type UseScrollCarouselOptions } from '@/hooks/useScrollCarousel';

const ITEM_GAP = 12;

interface ScrollCarouselProps extends UseScrollCarouselOptions {
  children: ReactNode;
  indicatorOffset?: number;
}

const ScrollCarousel = ({
  itemCount,
  itemsPerView = 1,
  autoPlay,
  children,
  indicatorOffset = 20,
}: ScrollCarouselProps) => {
  const { containerRef, pageCount, activePage, scrollToPage } = useScrollCarousel({
    itemCount,
    itemsPerView,
    autoPlay,
  });

  return (
    <StyledContainer gap={indicatorOffset}>
      <StyledViewport ref={containerRef}>
        <StyledTrack>
          {Children.map(children, (child) => (
            <StyledSlot itemsPerView={itemsPerView}>{child}</StyledSlot>
          ))}
        </StyledTrack>
      </StyledViewport>
      <StyledIndicators>
        {Array.from({ length: pageCount }).map((_, page) => (
          <StyledIndicator key={page} isActive={activePage === page} onClick={() => scrollToPage(page)} />
        ))}
      </StyledIndicators>
    </StyledContainer>
  );
};

export default ScrollCarousel;

const StyledContainer = styled.div<{ gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => `${gap}px`};
  width: 100%;
`;

const StyledViewport = styled.div`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTrack = styled.div`
  display: flex;
  gap: ${ITEM_GAP}px;
`;

const StyledSlot = styled.div<{ itemsPerView: number }>`
  flex: 0 0 ${({ itemsPerView }) => `calc((100% - ${ITEM_GAP * (itemsPerView - 1)}px) / ${itemsPerView})`};
  min-width: 0;
  scroll-snap-align: start;
`;

const StyledIndicators = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  width: 100%;
`;

const StyledIndicator = styled.button<{ isActive: boolean }>`
  border-radius: 10px;
  background-color: ${({ isActive }) => (isActive ? colors.gray50 : colors.gray600)};
  width: 16px;
  height: 4px;
`;

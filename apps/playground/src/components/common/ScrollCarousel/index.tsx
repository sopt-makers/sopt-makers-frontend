import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import type { ReactNode } from 'react';

import { useScrollCarousel } from '@/hooks/useScrollCarousel';

const ITEM_GAP = 12;

interface ScrollCarouselProps<T extends { id: string | number }> {
  items: T[];
  itemsPerView?: number;
  autoSlideInterval?: number;
  renderItem: (item: T) => ReactNode;
}

const ScrollCarousel = <T extends { id: string | number }>({
  items,
  itemsPerView = 1,
  autoSlideInterval = 2000,
  renderItem,
}: ScrollCarouselProps<T>) => {
  const { containerRef, loopedItems, pageCount, activePage, scrollToPage } = useScrollCarousel({
    items,
    itemsPerView,
    autoSlideInterval,
  });

  return (
    <StyledContainer>
      <StyledViewport ref={containerRef}>
        <StyledTrack>
          {loopedItems.map((item, index) => (
            <StyledSlot key={`${item.id}-${index}`} itemsPerView={itemsPerView}>
              {renderItem(item)}
            </StyledSlot>
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

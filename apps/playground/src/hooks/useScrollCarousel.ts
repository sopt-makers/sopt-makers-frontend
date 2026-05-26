import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

interface UseScrollCarouselOptions<T> {
  items: T[];
  itemsPerView?: number;
  autoSlideInterval?: number;
}

const getLoopedItems = <T>(items: T[], itemsPerView = 1): T[] => {
  if (items.length > itemsPerView) {
    return [...items.slice(-itemsPerView), ...items, ...items.slice(0, itemsPerView)];
  } else {
    return items;
  }
};

export const useScrollCarousel = <T>({
  items,
  itemsPerView = 1,
  autoSlideInterval = 2000,
}: UseScrollCarouselOptions<T>) => {
  const itemCount = items.length;
  const loopedItems = useMemo(() => getLoopedItems(items, itemsPerView), [items, itemsPerView]);

  const isLoopEnabled = itemCount > itemsPerView;
  const startIndex = isLoopEnabled ? itemsPerView : 0;

  const [activeIndex, setActiveIndex] = useState(startIndex);
  const activeIndexRef = useRef(activeIndex);
  useLayoutEffect(function syncActiveIndexRef() {
    activeIndexRef.current = activeIndex;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollLeftRef = useRef(0);
  const scrollMonitorRef = useRef<number | null>(null);

  const getCardStep = () => {
    const container = containerRef.current;
    if (!container) {
      return null;
    }

    const track = container.firstElementChild;
    const cards = track?.children;

    if (!cards || cards.length < 2) {
      return null;
    } else {
      // card width + gap 계산
      return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    }
  };

  const scrollToIndex = (index: number, smooth = true) => {
    const container = containerRef.current;
    const step = getCardStep();
    if (!container || !step) return;

    container.scrollTo({
      left: step * index,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  // 스크롤이 끝났는지 감지후 안정 상태일 때 작업을 수행
  const monitorScrollStop = (onStableScroll: () => void) => {
    const container = containerRef.current;
    if (!container) return;

    let stableCount = 0;
    const maxStableCount = 3; // 3프레임 연속 scrollLeft 변화 없을 경우 안정 상태로 간주

    const checkScroll = () => {
      const current = container.scrollLeft;

      if (current === lastScrollLeftRef.current) {
        stableCount++;
      } else {
        stableCount = 0;
        lastScrollLeftRef.current = current;
      }

      if (stableCount >= maxStableCount) {
        scrollMonitorRef.current = null;
        onStableScroll(); // 안정되었다면 콜백 실행
        return;
      }

      scrollMonitorRef.current = requestAnimationFrame(checkScroll);
    };

    if (scrollMonitorRef.current) cancelAnimationFrame(scrollMonitorRef.current);
    scrollMonitorRef.current = requestAnimationFrame(checkScroll);
  };

  useEffect(
    function initializeScrollPosition() {
      scrollToIndex(startIndex, false);
      setActiveIndex(startIndex);
    },
    [itemCount, itemsPerView],
  );

  useEffect(
    function runAutoSlide() {
      if (!isLoopEnabled) return;

      const intervalId = setInterval(() => {
        scrollToIndex(activeIndex + itemsPerView);
      }, autoSlideInterval);

      return () => clearInterval(intervalId);
    },
    [activeIndex, autoSlideInterval, isLoopEnabled, itemsPerView],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trackScrollAndWrap = () => {
      const step = getCardStep();
      if (!step || !isLoopEnabled) return;

      const index = Math.round(container.scrollLeft / step);
      setActiveIndex(index);

      if (index < itemsPerView) {
        // 앞쪽 복제 구간 → 끝쪽 실제 카드로 점프
        monitorScrollStop(() => {
          scrollToIndex(index + itemCount, false);
          setActiveIndex(index + itemCount);
        });
      } else if (index >= itemsPerView + itemCount) {
        // 뒤쪽 복제 구간 → 앞쪽 실제 카드로 점프
        monitorScrollStop(() => {
          scrollToIndex(index - itemCount, false);
          setActiveIndex(index - itemCount);
        });
      }
    };

    container.addEventListener('scroll', trackScrollAndWrap);
    return () => container.removeEventListener('scroll', trackScrollAndWrap);
  }, [itemCount, itemsPerView, isLoopEnabled]);

  useEffect(() => {
    const realignCurrentCard = () => {
      scrollToIndex(activeIndexRef.current, false);
    };
    window.addEventListener('resize', realignCurrentCard);
    return () => window.removeEventListener('resize', realignCurrentCard);
  }, []);

  // 확장 배열 인덱스 → 실제 데이터 인덱스 (0-based)
  const getActivePage = (index: number) => {
    if (!isLoopEnabled) {
      return 0;
    } else {
      const realIndex = (((index - itemsPerView) % itemCount) + itemCount) % itemCount;
      return Math.floor(realIndex / itemsPerView);
    }
  };

  // 페이지 단위(= itemsPerView개 묶음) 계산
  const pageCount = Math.ceil(itemCount / itemsPerView);
  const activePage = getActivePage(activeIndex);
  const scrollToPage = (page: number) => scrollToIndex(startIndex + page * itemsPerView);

  return {
    containerRef,
    loopedItems,
    pageCount,
    activePage,
    scrollToPage,
  };
};

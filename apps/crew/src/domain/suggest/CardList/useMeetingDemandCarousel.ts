import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseMeetingDemandCarouselParams {
  loadedPageCount: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => Promise<unknown>;
  dragFree: boolean;
}

/**
 * 캐러셀 페이지를 관리하고 마지막 전 페이지부터 다음 페이지를 미리 불러옵니다.
 * 최초에는 두 번째 페이지까지 선로딩합니다.
 */
const useMeetingDemandCarousel = ({
  loadedPageCount,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
  dragFree,
}: UseMeetingDemandCarouselParams) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree,
  });
  const [selectedPage, setSelectedPage] = useState(0);
  const requestedLoadedPageCountRef = useRef<number | null>(null);

  const loadNextPage = useCallback(
    (pageIndex: number) => {
      const isNearLastLoadedPage = pageIndex >= loadedPageCount - 2;

      if (!isNearLastLoadedPage || !hasNextPage || isFetchingNextPage) return;
      if (requestedLoadedPageCountRef.current === loadedPageCount) return;

      requestedLoadedPageCountRef.current = loadedPageCount;
      void onFetchNextPage();
    },
    [hasNextPage, isFetchingNextPage, loadedPageCount, onFetchNextPage],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const syncSelectedPage = () => {
      const nextSelectedPage = emblaApi.selectedScrollSnap();
      setSelectedPage(nextSelectedPage);
      return nextSelectedPage;
    };
    const handleSelect = () => loadNextPage(syncSelectedPage());
    const handlePointerDown = () => loadNextPage(emblaApi.selectedScrollSnap());

    syncSelectedPage();
    emblaApi.on('select', handleSelect);
    emblaApi.on('pointerDown', handlePointerDown);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('pointerDown', handlePointerDown);
    };
  }, [emblaApi, loadNextPage]);

  useEffect(() => {
    if (loadedPageCount === 1) {
      loadNextPage(0);
    }
  }, [loadNextPage, loadedPageCount]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    loadNextPage(selectedPage);

    if (selectedPage < loadedPageCount - 1) {
      emblaApi?.scrollNext();
    }
  };

  const scrollTo = (pageIndex: number) => {
    emblaApi?.scrollTo(pageIndex);
  };

  return {
    emblaRef,
    selectedPage,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
};

export default useMeetingDemandCarousel;

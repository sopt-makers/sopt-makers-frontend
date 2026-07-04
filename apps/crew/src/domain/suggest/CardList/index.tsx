import Arrow from '@assets/svg/group_browsing_arrow_left.svg';
import { useDisplay } from '@hook/useDisplay';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';

import SuggestionCard from '../SuggestionCard';
import type { MeetingDemandPageData } from '../types';

interface CardListProps {
  pages: MeetingDemandPageData[];
  onCardClick: (meetingDemandId: number) => void;
  onWaitingChange: (meetingDemandId: number, isWaiting: boolean) => void;
}

const CardList = ({ pages, onCardClick, onWaitingChange }: CardListProps) => {
  const { isDesktop, isLaptop, isMobile } = useDisplay();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: isDesktop && !isMobile,
  });
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => setSelectedPage(emblaApi.selectedScrollSnap());

    handleSelect();
    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi]);

  if (pages.length === 0) return null;

  return (
    <SCardList>
      <SCarousel>
        {isLaptop && selectedPage > 0 && (
          <SArrowButton direction='left' onClick={() => emblaApi?.scrollPrev()}>
            <Arrow />
          </SArrowButton>
        )}

        <SViewport ref={emblaRef}>
          <SSlideContainer>
            {pages.map((page) => (
              <SSlide key={page.meta.page}>
                {page.meetingDemands.map((suggestion) => (
                  <li key={suggestion.id}>
                    <SuggestionCard
                      suggestion={suggestion}
                      onClick={() => onCardClick(suggestion.id)}
                      onWaitingChange={(isWaiting) => onWaitingChange(suggestion.id, isWaiting)}
                    />
                  </li>
                ))}
              </SSlide>
            ))}
          </SSlideContainer>
        </SViewport>

        {isLaptop && selectedPage < pages.length - 1 && (
          <SArrowButton direction='right' onClick={() => emblaApi?.scrollNext()}>
            <Arrow />
          </SArrowButton>
        )}
      </SCarousel>

      {(isLaptop || isMobile) && pages.length > 1 && (
        <SIndicatorList>
          {pages.map(({ meta }, pageIndex) => (
            <SIndicator
              key={meta.page}
              selected={selectedPage === pageIndex}
              onClick={() => emblaApi?.scrollTo(pageIndex)}
            />
          ))}
        </SIndicatorList>
      )}
    </SCardList>
  );
};

export default CardList;

const SCardList = styled('section', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.s12,
});

const SCarousel = styled('div', {
  position: 'relative',
  width: '100%',
  maxWidth: '1328px',
  margin: '0 auto',
});

const SViewport = styled('div', {
  'width': '100%',
  'maxWidth': '1200px',
  'margin': '0 auto',
  'overflow': 'hidden',

  '@desktop': {
    maxWidth: '894px',
  },
});

const SSlideContainer = styled('div', {
  display: 'flex',
  gap: spacing.s12,
});

const SSlide = styled('ul', {
  'display': 'grid',
  'gridTemplateColumns': 'repeat(3, minmax(0, 1fr))',
  'flex': '0 0 100%',
  'minWidth': 0,
  'gap': spacing.s12,

  '@desktop': {
    gridTemplateColumns: 'none',
    gridAutoFlow: 'column',
    gridAutoColumns: '392px',
    flexBasis: 'auto',
  },

  '@mobile': {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
    gridAutoFlow: 'row',
    gridAutoColumns: 'auto',
    flexBasis: '100%',
    minHeight: '444px',
  },
});

const SArrowButton = styled('button', {
  'position': 'absolute',
  'top': '50%',
  'zIndex': 1,
  'width': spacing.s40,
  'height': spacing.s40,
  'padding': 0,
  'cursor': 'pointer',

  '& svg': {
    'display': 'block',
    'width': '100%',
    'height': '100%',

    '& circle': {
      transition: 'fill 0.1s ease-in-out',
    },

    '&:hover circle': {
      fill: colors.bg.neutral.subtle,
    },
  },

  'variants': {
    direction: {
      left: {
        left: 'clamp(-50px, calc(1270px - 100vw), 10px)',
        transform: 'translateY(-50%)',
      },
      right: {
        right: 'clamp(-50px, calc(1270px - 100vw), 10px)',
        transform: 'translateY(-50%) rotate(180deg)',
      },
    },
  },
});

const SIndicatorList = styled('div', {
  display: 'flex',
  gap: spacing.s6,
});

const SIndicator = styled('button', {
  width: spacing.s16,
  height: spacing.s4,
  padding: 0,
  borderRadius: radius.full,
  backgroundColor: colors.fg.neutral.defaultDisabled,

  variants: {
    selected: {
      true: {
        backgroundColor: colors.fg.neutral.default,
      },
    },
  },
});

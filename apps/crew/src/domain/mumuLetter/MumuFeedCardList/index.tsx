import { spacing } from '@sopt-mds/design-tokens';
import useEmblaCarousel from 'embla-carousel-react';
import { styled } from 'stitches.config';

import MumuFeedCard from '../MumuFeedCard';
import type { MumuFeedCardData } from '../types';

interface MumuFeedCardListProps {
  posts: MumuFeedCardData[];
}

const MumuFeedCardList = ({ posts }: MumuFeedCardListProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
  });

  if (posts.length === 0) return null;

  return (
    <Viewport ref={emblaRef}>
      <CardList>
        {posts.map((post) => (
          <li key={post.postId}>
            <MumuFeedCard post={post} />
          </li>
        ))}
      </CardList>
    </Viewport>
  );
};

export default MumuFeedCardList;

const Viewport = styled('div', {
  'overflow': 'hidden',
  'margin': `${spacing.s20} 0 0`,

  '@mobile': {
    margin: `${spacing.s16} 0 0`,
  },
});

const CardList = styled('ul', {
  'display': 'flex',
  'touchAction': 'pan-y pinch-zoom',
  'gap': spacing.s20,

  '@mobile': {
    gap: spacing.s16,
  },
});

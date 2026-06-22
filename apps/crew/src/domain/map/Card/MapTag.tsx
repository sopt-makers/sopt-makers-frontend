import { getCategoryLabel } from '@api/map/constant';
import type { mapData } from '@api/map/type';
import { Tag } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

type MapTagType = NonNullable<mapData['mapTags']>[number];

interface MapTagProps {
  tag: MapTagType;
  size: 'sm' | 'md';
}

function MapTag({ tag, size }: MapTagProps) {
  return (
    <SMapTag mapTag={tag} size={size}>
      {getCategoryLabel(tag)}
    </SMapTag>
  );
}

export default MapTag;

const SMapTag = styled(Tag, {
  variants: {
    mapTag: {
      CAFE: {
        '&&': {
          color: '$secondary',
          backgroundColor: '$orangeAlpha200',
        },
      },
      FOOD: {
        '&&': {
          color: '$information',
          backgroundColor: 'rgba(22, 191, 129, 0.2)',
        },
      },
      ETC: {
        '&&': {
          color: '$success',
          backgroundColor: '$blueAlpha200',
        },
      },
    },
  },
});

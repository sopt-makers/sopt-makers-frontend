import { SCardGrid } from '@shared/util/layout/CardGrid';
import type { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';

function GridLayout({ children, mobileType }: PropsWithChildren<{ mobileType: 'list' | 'card' }>) {
  return (
    <SGridContainer as='ul' mobileType={mobileType}>
      {children}
    </SGridContainer>
  );
}

const SGridContainer = styled(SCardGrid, {
  'rowGap': '104px',

  'margin': '24px 0 120px 0',
  'placeItems': 'start center',

  '@tablet': {
    rowGap: '120px',
    alignItems: 'center',
  },

  'variants': {
    mobileType: {
      list: {
        '@mobile': {
          rowGap: '16px',
        },
      },
      card: {
        '@mobile': {
          alignItems: 'center',
          gridTemplateColumns: 'repeat(3, 1fr)',
          margin: '16px 0 40px 0',
          rowGap: '40px',
          columnGap: '11px',
        },
        '@media (max-width: 550px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 359px)': {
          gridTemplateColumns: '1fr',
        },
      },
    },
  },
});

export default GridLayout;

import { styled } from 'stitches.config';

export const SCardGrid = styled('div', {
  'display': 'grid',
  'gridTemplateColumns': 'repeat(3, 1fr)',
  'columnGap': 30,
  '@desktop': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@tablet': { gridTemplateColumns: '1fr' },
});

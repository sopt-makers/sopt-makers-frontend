import { spacing } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

import type { Attendee } from '../types';
import Card from './Card';

interface ListProps {
  attendees: Attendee[];
}

const List = ({ attendees }: ListProps) => (
  <SList>
    {attendees.map((attendee) => (
      <Card key={attendee.id} {...attendee} />
    ))}
  </SList>
);

export default List;

const SList = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s16,
  '@mobile': {
    gap: spacing.s0,
  },
});

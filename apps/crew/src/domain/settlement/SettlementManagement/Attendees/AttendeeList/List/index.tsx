import { spacing } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

import type { Attendee } from '../types';
import Card from './Card';

interface ListProps {
  attendees: Attendee[];
  onDelete: (attendeeUserId: number) => void;
  isDeleting: boolean;
}

const List = ({ attendees, onDelete, isDeleting }: ListProps) => (
  <SList>
    {attendees.map((attendee) => (
      <Card key={attendee.id} {...attendee} onDelete={onDelete} isDeleting={isDeleting} />
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

import type { components } from '@/__generated__/schema';

export type Attendee = NonNullable<
  components['schemas']['DiningV2GetAttendeeManagementResponseDto']['attendees']
>[number];

export type AttendeeFilterKey = 'roundId' | 'take' | 'date';

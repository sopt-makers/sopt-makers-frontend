import { SelectV2 } from '@sopt-makers/ui';
import { spacing } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

import { ATTENDEE_PAGE_SIZES } from '../constants';
import { rounds } from '../mock';
import type { AttendeeFilterKey } from '../types';

type FilterOption = {
  value: string;
  label: string;
};

const filters: {
  key: AttendeeFilterKey;
  label: string;
  options: FilterOption[];
}[] = [
  {
    key: 'roundId',
    label: '회차 선택',
    options: rounds.map(({ roundId, roundNumber, attendeeCount }) => ({
      value: String(roundId),
      label: `${roundNumber}회차 (${attendeeCount})`,
    })),
  },
  {
    key: 'take',
    label: '표시 인원 선택',
    options: ATTENDEE_PAGE_SIZES.map((value) => ({ value, label: `${value}명씩 보기` })),
  },
  {
    key: 'date',
    label: '정렬 순서 선택',
    options: [
      { value: 'desc', label: '최신순' },
      { value: 'asc', label: '오래된 순' },
    ],
  },
];

type FiltersProps = {
  roundId: number;
  take: string;
  date: 'asc' | 'desc';
  onChange: (key: AttendeeFilterKey, value: string) => void;
};

const Filters = ({ roundId, take, date, onChange }: FiltersProps) => {
  const selectedValues = { roundId: String(roundId), take, date };

  const handleChange = (key: AttendeeFilterKey, value: string | string[]) => {
    if (typeof value === 'string') onChange(key, value);
  };

  return (
    <SFilters>
      {filters.map(({ key, label, options }) => {
        const selected = options.find((option) => option.value === selectedValues[key]);

        return (
          <SFilter key={key} isRound={key === 'roundId'}>
            <SelectV2.Root
              key={`${key}-${selectedValues[key]}`}
              type='text'
              defaultValue={selected}
              onChange={(value) => handleChange(key, value)}
            >
              <SelectV2.Trigger>
                <SFilterTrigger aria-label={label} />
              </SelectV2.Trigger>
              <SelectV2.Menu>
                {options.map((option) => (
                  <SelectV2.MenuItem key={option.value} option={option} />
                ))}
              </SelectV2.Menu>
            </SelectV2.Root>
          </SFilter>
        );
      })}
    </SFilters>
  );
};

export default Filters;

const SFilters = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'marginBottom': spacing.s16,
  '@mobile': {
    marginBottom: spacing.s0,
  },
});

const SFilter = styled('div', {
  variants: {
    isRound: {
      true: {
        marginRight: 'auto',
      },
    },
  },
});

const SFilterTrigger = styled(SelectV2.TriggerContent, {
  '&&': {
    minWidth: 0,
  },
});

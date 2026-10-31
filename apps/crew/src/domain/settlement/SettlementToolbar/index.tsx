import { SearchField, SelectV2 } from '@sopt-makers/ui';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { IconRefresh } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';

import { SETTLEMENT_PART_OPTIONS, SETTLEMENT_SEARCH_MAX_LENGTH, SETTLEMENT_STATUS_OPTIONS } from '../constant';
import type { SettlementListFilters } from '../hooks/useSettlementListParams';
import { normalizeSettlementSearch } from '../util';

interface SettlementToolbarProps {
  showFilters?: boolean;
  filters: SettlementListFilters;
  onChange: (updates: Partial<SettlementListFilters>) => void;
}

const SettlementToolbar = ({ showFilters = true, filters, onChange }: SettlementToolbarProps) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const handleSearchSubmit = () => {
    const search = normalizeSettlementSearch(searchInput);
    setSearchInput(search);
    onChange({ search });
  };

  const handleSearchReset = () => {
    setSearchInput('');
    onChange({ search: '' });
  };

  const handleFilterReset = () => {
    onChange({ status: undefined, part: undefined });
  };

  return (
    <SToolbar showFilters={showFilters}>
      {showFilters && (
        <SFilters>
          <SettlementFilter
            label='진행 상태'
            options={SETTLEMENT_STATUS_OPTIONS}
            value={filters.status}
            onChange={(status) => onChange({ status })}
          />
          <SettlementFilter
            label='파트'
            options={SETTLEMENT_PART_OPTIONS}
            value={filters.part}
            onChange={(part) => onChange({ part })}
          />
          <SResetButton
            type='button'
            size='medium'
            variant='secondary'
            onClick={handleFilterReset}
            aria-label='필터 초기화'
          >
            <IconRefresh width={20} height={20} aria-hidden />
          </SResetButton>
        </SFilters>
      )}
      <SSearchWrapper
        role='search'
        onSubmit={(event) => {
          event.preventDefault();
          handleSearchSubmit();
        }}
        onReset={(event) => {
          event.preventDefault();
          handleSearchReset();
          event.currentTarget.querySelector('input')?.focus();
        }}
        onBlurCapture={(event) => {
          if (event.currentTarget.contains(event.relatedTarget)) {
            event.stopPropagation();
          }
        }}
      >
        <button type='submit' hidden />
        <SSearchInput
          aria-label='회식명 검색'
          placeholder='회식명을 검색해보세요'
          maxLength={SETTLEMENT_SEARCH_MAX_LENGTH}
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onSubmit={() => undefined}
          onReset={() => undefined}
        />
      </SSearchWrapper>
    </SToolbar>
  );
};

interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface SettlementFilterProps<T extends string> {
  label: string;
  options: FilterOption<T>[];
  value?: T;
  onChange: (value: T | undefined) => void;
}

const SettlementFilter = <T extends string>({ label, options, value, onChange }: SettlementFilterProps<T>) => {
  const handleChange = (selected: string | string[]) => {
    onChange(options.find((option) => option.value === selected)?.value);
  };

  return (
    <div role='group' aria-label={label}>
      <SelectV2.Root
        key={value ?? 'all'}
        type='text'
        visibleOptions={options.length + 1}
        defaultValue={options.find((option) => option.value === value) ?? null}
        onChange={handleChange}
      >
        <SelectV2.Trigger>
          <SFilterTriggerContent placeholder={label} />
        </SelectV2.Trigger>
        <SelectV2.Menu>
          <SelectV2.MenuItem option={{ value: '', label: '전체' }} />
          {options.map((option) => (
            <SelectV2.MenuItem key={option.value} option={option} />
          ))}
        </SelectV2.Menu>
      </SelectV2.Root>
    </div>
  );
};

export default SettlementToolbar;

const SToolbar = styled('div', {
  'display': 'flex',
  'justifyContent': 'space-between',
  '@mobile': {
    flexDirection: 'column',
    gap: spacing.s10,
  },
  'variants': {
    showFilters: {
      false: { justifyContent: 'flex-end' },
    },
  },
});

const SFilters = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing.s10,
});

const SFilterTriggerContent = styled(SelectV2.TriggerContent, {
  '&&': { minWidth: '120px' },
});

const SResetButton = styled(ActionButton, {
  '&&': {
    color: colors.base.gray200,
    backgroundColor: colors.bg.neutral.ghost,
  },
});

const SSearchWrapper = styled('form', {
  'width': 335,
  '@mobile': { width: '100%', order: -1 },
});

const SSearchInput = styled(SearchField, {
  'display': 'flex',
  'padding': `11px ${spacing.s16}`,
  'borderRadius': radius.r10,
  'backgroundColor': colors.bg.neutral.ghost,
  '& > button': { bottom: 0 },
  '& > button:focus-visible': {
    outline: `2px solid ${colors.stroke.neutral.defaultFocused}`,
    outlineOffset: 2,
    borderRadius: radius.r10,
  },
});

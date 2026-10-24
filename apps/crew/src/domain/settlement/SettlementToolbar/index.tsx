import { SearchField, SelectV2 } from '@sopt-makers/ui';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { IconRefresh } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'stitches.config';

import { SETTLEMENT_PART_OPTIONS, SETTLEMENT_STATUS_OPTIONS } from '../types';

interface SettlementQuery {
  status?: string;
  part?: string;
  search?: string;
}

const SettlementToolbar = () => {
  const router = useRouter();
  const searchQuery = (Array.isArray(router.query.search) ? router.query.search[0] : router.query.search) ?? '';
  const [searchInput, setSearchInput] = useState(searchQuery);
  const selectedStatuses = getSelectedValues(router.query.status, SETTLEMENT_STATUS_OPTIONS);
  const selectedParts = getSelectedValues(router.query.part, SETTLEMENT_PART_OPTIONS);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const updateQuery = (updates: SettlementQuery) => {
    const nextQuery = { ...router.query };

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        nextQuery[key] = value;
      } else {
        delete nextQuery[key];
      }
    });

    if ('page' in nextQuery) {
      nextQuery.page = '1';
    }

    void router.push({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true, scroll: false });
  };

  const handleSearchSubmit = () => {
    const search = searchInput.trim();
    setSearchInput(search);
    updateQuery({ search });
  };

  const handleSearchReset = () => {
    setSearchInput('');
    updateQuery({ search: undefined });
  };

  const handleFilterReset = () => {
    updateQuery({ status: undefined, part: undefined });
  };

  return (
    <SToolbar>
      <SFilters>
        <SettlementFilter
          label='진행 상태'
          options={SETTLEMENT_STATUS_OPTIONS}
          selectedValues={selectedStatuses}
          onChange={(values) => updateQuery({ status: values.join(',') })}
        />
        <SettlementFilter
          label='파트'
          options={SETTLEMENT_PART_OPTIONS}
          selectedValues={selectedParts}
          onChange={(values) => updateQuery({ part: values.join(',') })}
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
        <SSearchInput
          aria-label='회식명 검색'
          placeholder='회식명을 검색해보세요'
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onSubmit={() => undefined}
          onReset={() => undefined}
        />
      </SSearchWrapper>
    </SToolbar>
  );
};

interface FilterOption {
  value: string;
  label: string;
}

interface SettlementFilterProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const getSelectedValues = (query: string | string[] | undefined, options: FilterOption[]) => {
  const values = (Array.isArray(query) ? query : [query ?? '']).flatMap((value) => value.split(','));
  return options.filter((option) => values.includes(option.value)).map((option) => option.value);
};

const SettlementFilter = ({ label, options, selectedValues, onChange }: SettlementFilterProps) => {
  const valueKey = selectedValues.join(',');
  const lastSelectionKey = useRef(valueKey);
  const [selectInstanceKey, setSelectInstanceKey] = useState(0);

  useEffect(() => {
    if (lastSelectionKey.current !== valueKey) {
      lastSelectionKey.current = valueKey;
      setSelectInstanceKey((key) => key + 1);
    }
  }, [valueKey]);

  const handleChange = (selected: string | string[]) => {
    const nextValues = getSelectedValues(selected, options);
    lastSelectionKey.current = nextValues.join(',');
    onChange(nextValues);
  };

  return (
    <div role='group' aria-label={label}>
      <SelectV2.Root
        key={selectInstanceKey}
        type='text'
        visibleOptions={6}
        defaultValue={options.filter((option) => selectedValues.includes(option.value))}
        onChange={handleChange}
        multiple
      >
        <SelectV2.Trigger>
          <SFilterTriggerContent placeholder={label} label={selectedValues.length > 1 ? label : undefined} />
        </SelectV2.Trigger>
        <SelectV2.Menu>
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
    paddingInline: spacing.s16,
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

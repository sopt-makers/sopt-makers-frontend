import type { SettlementListPart, SettlementListStatus } from '@api/settlement/type';
import { useQueryString } from '@hook/queryString';
import { useSearchParams } from '@hook/queryString/custom';
import { SelectV2 } from '@sopt-makers/ui';
import { colors, spacing } from '@sopt-mds/design-tokens';
import { IconRefresh } from '@sopt-mds/icons';
import { ActionButton, SearchField } from '@sopt-mds/ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';

import { SETTLEMENT_PART_OPTIONS, SETTLEMENT_SEARCH_MAX_LENGTH, SETTLEMENT_STATUS_OPTIONS } from '../constant';
import { normalizeSettlementSearch } from '../util';

interface SettlementToolbarProps {
  showFilters?: boolean;
}

const SettlementToolbar = ({ showFilters = true }: SettlementToolbarProps) => {
  const router = useRouter();
  const {
    value: statusValue,
    setValue: setStatus,
    deleteKey: deleteStatus,
  } = useQueryString('status', undefined, true);
  const { value: partValue, setValue: setPart, deleteKey: deletePart } = useQueryString('part', undefined, true);
  const { value: searchValue, setValue: setSearch, deleteKey: deleteSearch } = useSearchParams();
  const selectedStatus = SETTLEMENT_STATUS_OPTIONS.find(({ value }) => value === statusValue)?.value;
  const selectedPart = SETTLEMENT_PART_OPTIONS.find(({ value }) => value === partValue)?.value;
  const searchQuery = normalizeSettlementSearch(searchValue ?? '');
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (value: string) => {
    const search = normalizeSettlementSearch(value);
    setSearchInput(search);

    if (search) {
      setSearch(search);
    } else {
      deleteSearch();
    }
  };

  const handleSearchReset = () => {
    setSearchInput('');
    deleteSearch();
  };

  const handleFilterReset = () => {
    const nextQuery: typeof router.query = { ...router.query, page: '1' };
    delete nextQuery.status;
    delete nextQuery.part;

    void router.push({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true, scroll: false });
  };

  return (
    <SToolbar>
      <SFilters key={String(showFilters)} visible={showFilters}>
        <SettlementFilter
          label='진행 상태'
          options={SETTLEMENT_STATUS_OPTIONS}
          value={selectedStatus}
          onChange={(status) => (status ? setStatus(status) : deleteStatus())}
        />
        <SettlementFilter
          label='파트'
          options={SETTLEMENT_PART_OPTIONS}
          value={selectedPart}
          onChange={(part) => (part ? setPart(part) : deletePart())}
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
      <SSearchWrapper role='search'>
        <SearchField
          aria-label='회식명 검색'
          placeholder='회식명을 검색해보세요'
          maxLength={SETTLEMENT_SEARCH_MAX_LENGTH}
          value={searchInput}
          onValueChange={setSearchInput}
          onSearch={handleSearchSubmit}
          onClear={handleSearchReset}
        />
      </SSearchWrapper>
    </SToolbar>
  );
};

type FilterValue = SettlementListStatus | SettlementListPart;

interface FilterOption {
  value: FilterValue;
  label: string;
}

interface SettlementFilterProps {
  label: string;
  options: FilterOption[];
  value?: FilterValue;
  onChange: (value: FilterValue | undefined) => void;
}

const SettlementFilter = ({ label, options, value, onChange }: SettlementFilterProps) => {
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
});

const SFilters = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing.s10,
  variants: {
    visible: {
      false: { visibility: 'hidden' },
    },
  },
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

const SSearchWrapper = styled('div', {
  'width': 335,
  '@mobile': { width: '100%', order: -1 },
});

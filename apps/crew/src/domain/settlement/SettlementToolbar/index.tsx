import { SearchField, SelectV2 } from '@sopt-makers/ui';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { IconRefresh } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';
import { useState } from 'react';
import { styled } from 'stitches.config';

import { SETTLEMENT_PART_OPTIONS, SETTLEMENT_STATUS_OPTIONS } from '../types';

const SettlementToolbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filterResetVersion, setFilterResetVersion] = useState(0);

  return (
    <SToolbar>
      <SFilters>
        <SettlementFilter key={`status-${filterResetVersion}`} label='진행 상태' options={SETTLEMENT_STATUS_OPTIONS} />
        <SettlementFilter key={`parts-${filterResetVersion}`} label='파트' options={SETTLEMENT_PART_OPTIONS} />
        <SResetButton
          type='button'
          size='medium'
          variant='secondary'
          onClick={() => setFilterResetVersion((version) => version + 1)}
          aria-label='필터 초기화'
        >
          <IconRefresh width={20} height={20} aria-hidden />
        </SResetButton>
      </SFilters>
      <SSearchWrapper
        role='search'
        onSubmit={(event) => event.preventDefault()}
        onReset={(event) => {
          event.preventDefault();
          setSearchInput('');
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

interface SettlementFilterProps {
  label: string;
  options: readonly { value: string; label: string }[];
}

const SettlementFilter = ({ label, options }: SettlementFilterProps) => {
  const [hasMultipleSelections, setHasMultipleSelections] = useState(false);

  return (
    <div role='group' aria-label={label}>
      <SelectV2.Root<string>
        type='text'
        visibleOptions={6}
        onChange={(selected) => setHasMultipleSelections(Array.isArray(selected) && selected.length > 1)}
        multiple
      >
        <SelectV2.Trigger>
          <SFilterTriggerContent placeholder={label} label={hasMultipleSelections ? label : undefined} />
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

import { CATEGORY_FILTER, GENERATION_FILTER, KEYWORD_FILTER, PART_FILTER, STATUS_FILTER } from '@constant/option';
import FilterResetButton from '@domain/list/Filter/Reset';
import { useSearchParams } from '@hook/queryString/custom';
import { styled } from 'stitches.config';

import DropDownFilter from './DropDown';
import Search from './Search';

function Filter() {
  const { value: search } = useSearchParams();

  return (
    <>
      <SFilterLayout>
        <ScrollFilter>
          <SFilterRow>
            <DropDownFilter filter={CATEGORY_FILTER} />
            <DropDownFilter filter={KEYWORD_FILTER} />
            <DropDownFilter filter={STATUS_FILTER} />
            <DropDownFilter filter={PART_FILTER} />
            <DropDownFilter filter={GENERATION_FILTER} />
            <FilterResetButton />
          </SFilterRow>
        </ScrollFilter>

        <SSearchWrapper>
          <Search />
        </SSearchWrapper>
      </SFilterLayout>

      {!!search && <SearchResultMessage>&quot;{search}&quot;에 대한 검색결과입니다.</SearchResultMessage>}
    </>
  );
}

export default Filter;

const SearchResultMessage = styled('p', {
  'fontAg': '24_medium_100',
  'mt': '$80',
  '@mobile': { display: 'none' },
});

const SFilterLayout = styled('div', {
  'display': 'grid',
  'gridTemplateAreas': '"filters search"',
  'gridTemplateColumns': 'minmax(0, 1fr) 335px',
  'alignItems': 'center',
  'width': '100%',

  '@desktop': {
    gridTemplateAreas: '"search" "filters"',
    gridTemplateColumns: 'minmax(0, 1fr)',
    rowGap: '$16',
  },
});

const SSearchWrapper = styled('div', {
  'gridArea': 'search',
  'display': 'flex',
  'justifyContent': 'flex-end',

  '@desktop': {
    justifyContent: 'center',
  },

  '@tablet': {
    justifyContent: 'flex-start',
  },
});

const SFilterRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$10',
  width: '100%',
});

const ScrollFilter = styled('div', {
  'gridArea': 'filters',
  'width': '100%',

  '@tablet': {
    width: '725px',
    justifySelf: 'start',
  },

  '@mobile': {
    'width': '100%',
    'overflow': 'hidden',
    'overflowX': 'scroll',

    '&::-webkit-scrollbar': {
      height: '2px',
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
});

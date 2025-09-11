import { CATEGORY_FILTER, GENERATION_FILTER, KEYWORD_FILTER, PART_FILTER, STATUS_FILTER } from '@constant/option';
import FilterResetButton from '@domain/list/Filter/Reset';
import { useSearchParams } from '@hook/queryString/custom';
import { useDisplay } from '@hook/useDisplay';
import { Flex } from '@shared/util/layout/Flex';
import { styled } from 'stitches.config';
import DropDownFilter from './DropDown';
import Search from './Search';

function Filter() {
  const { value: search } = useSearchParams();
  const { isLaptop } = useDisplay();

  return (
    <>
      {isLaptop ? <Search /> : <></>}
      <Flex align="center" justify="between">
        <ScrollFilter>
          <Flex>
            <DropDownFilter filter={CATEGORY_FILTER} width={'149px'} />
            <DropDownFilter filter={KEYWORD_FILTER} width={'133px'} />
            <DropDownFilter filter={STATUS_FILTER} width={'152px'} />
            <DropDownFilter filter={PART_FILTER} width={'121px'} />
            <DropDownFilter filter={GENERATION_FILTER} width={'110px'} />
            <FilterResetButton />
          </Flex>
        </ScrollFilter>

        {isLaptop ? <></> : <Search />}
      </Flex>

      {!!search && <SearchResultMessage>"{search}"에 대한 검색결과입니다.</SearchResultMessage>}
    </>
  );
}

export default Filter;

const SearchResultMessage = styled('p', {
  fontAg: '24_medium_100',
  mt: '$80',
  '@media (max-width: 768px)': { display: 'none' },
});

const ScrollFilter = styled('div', {
  '@laptop': {
    marginTop: '16px',
  },

  '@media (max-width: 768px)': {
    overflow: 'hidden',
    overflowX: 'scroll',

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

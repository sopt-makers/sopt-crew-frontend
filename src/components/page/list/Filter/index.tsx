import { styled } from 'stitches.config';
import { Flex } from '@components/util/layout/Flex';
import { useSearchParams } from '@hooks/queryString/custom';
import Search from './Search';
import { CATEGORY_FILTER, GENERATION_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import DropDownFilter from './DropDown';
import { useDisplay } from '@hooks/useDisplay';

function Filter() {
  const { value: search } = useSearchParams();
  const { isLaptop } = useDisplay();

  return (
    <>
      {isLaptop ? <Search /> : <></>}
      <Flex align="center" justify="between">
        <ScrollFilter>
          <Flex>
            <DropDownFilter filter={CATEGORY_FILTER} />
            <DropDownFilter filter={PART_FILTER} />
            <DropDownFilter filter={STATUS_FILTER} />
            <DropDownFilter filter={GENERATION_FILTER} />
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

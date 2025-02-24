import { styled } from 'stitches.config';
import { Flex } from '@components/util/layout/Flex';
import { useSearchParams } from '@hooks/queryString/custom';
import Search from './Search';
import { CATEGORY_FILTER, GENERATION_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import DropDownFilter from './DropDown';

function Filter() {
  const { value: search } = useSearchParams();

  return (
    <>
      <Flex align="center" justify="between">
        <ScrollFilter>
          <Flex>
            <DropDownFilter filter={CATEGORY_FILTER} />
            <DropDownFilter filter={PART_FILTER} />
            <DropDownFilter filter={STATUS_FILTER} />
            <DropDownFilter filter={GENERATION_FILTER} />
          </Flex>
        </ScrollFilter>

        <Search />
      </Flex>

      {!!search && <SearchResultMessage>"{search}"에 대한 검색결과입니다.</SearchResultMessage>}
    </>
  );
}

export default Filter;

const SearchResultMessage = styled('p', {
  fontAg: '24_medium_100',
  mt: '$80',
  '@tablet': { display: 'none' },
});

const ScrollFilter = styled('div', {
  '@tablet': {
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

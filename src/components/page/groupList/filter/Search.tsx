import SearchIcon from '@assets/svg/search.svg';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

function Search() {
  return (
    <SearchWrapper align="center" justify="between">
      <SearchInput type="text" placeholder="모임 검색" />
      <SearchButton>
        <SearchIcon />
      </SearchButton>
    </SearchWrapper>
  );
}

export default Search;
const SearchWrapper = styled(Flex, {
  width: '242px',
  py: '$13',
  px: '$24',
  border: '1px solid $black40',
  borderRadius: '59px',
});

const SearchInput = styled('input', {
  width: '200px',
  color: '$white',
});

const SearchButton = styled('button', {
  flexType: 'center',
});

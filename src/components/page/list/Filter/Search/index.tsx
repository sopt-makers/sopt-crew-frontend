import { useSearchParams } from '@hooks/queryString/custom';
import SearchMobile from './Mobile';
import { SearchField } from '@sopt-makers/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@stitches/react';

const buttonPositioner = css({
  display: 'flex',
  width: '100%',
  padding: '11px 16px',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexShrink: 0,
  borderRadius: '10px',
  background: 'var(--Color-Gray-Scale-800, #202025)',

  //notice: MDS Input styling 에러로 인해, 직접 스타일링함함
  '& > button': {
    bottom: 0,
  },

  '@media (min-width: 1260px)': {
    width: '335px',
  },
});

function Search() {
  const { setValue: setSearch, deleteKey } = useSearchParams();

  const router = useRouter();
  const searchQuery = String(router.query.search || '');
  const [inputValue, setInputValue] = useState(searchQuery);

  if (!inputValue && searchQuery !== inputValue) {
    deleteKey();
  }

  return (
    <SearchField
      className={buttonPositioner()}
      placeholder="모임 검색"
      value={inputValue}
      onChange={e => {
        setInputValue(e.target.value);
      }}
      onSubmit={() => {
        setSearch(inputValue);
        setInputValue(inputValue);
      }}
      onReset={() => {
        setInputValue('');
        deleteKey();
      }}
    />
  );
}

export default Search;

Search.Mobile = SearchMobile;

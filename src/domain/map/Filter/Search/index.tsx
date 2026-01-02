import { useSearchParams } from '@hook/queryString/custom';
import { SearchField } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styled } from 'stitches.config';

function Search() {
  const { setValue: setSearch, deleteKey } = useSearchParams();
  const router = useRouter();
  const searchQuery = String(router.query.search || '');
  const [inputValue, setInputValue] = useState(searchQuery);

  if (!inputValue && searchQuery !== inputValue) {
    deleteKey();
  }

  return (
    <SSearchField
      placeholder="주변 지하철역을 검색해 보세요"
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

const SSearchField = styled(SearchField, {
  width: '335px',
  display: 'flex',
  padding: '$11 $16',
  alignItems: 'center',
  borderRadius: '10px',
  background: '$gray800',

  '@media (max-width: 768px)': {
    marginTop: '$28',
  },
});

export default Search;

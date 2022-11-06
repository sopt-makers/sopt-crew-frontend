import SearchIcon from '@assets/svg/search.svg';
import { Flex } from '@components/util/layout/Flex';
import { useFilterContext } from '@providers/groupList/FilterProvider';

import { FieldValues, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

function Search() {
  const { handleSearch } = useFilterContext();
  const { register, handleSubmit } = useForm();
  const onSubmit = (value: FieldValues) => {
    handleSearch(value.search);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SSearchWrapper align="center" justify="between">
        <SSearchInput
          type="text"
          placeholder="모임 검색"
          {...register('search')}
        />
        <SSearchButton>
          <SearchIcon />
        </SSearchButton>
      </SSearchWrapper>
    </form>
  );
}

export default Search;
const SSearchWrapper = styled(Flex, {
  width: '242px',
  py: '$13',
  px: '$24',
  border: '1px solid $black40',
  borderRadius: '59px',
});

const SSearchInput = styled('input', {
  width: '200px',
  color: '$white',
  fontAg: '18_medium_100',

  '&::placeholder': {
    fontAg: '18_medium_100',
  },
});

const SSearchButton = styled('button', {
  flexType: 'center',
});

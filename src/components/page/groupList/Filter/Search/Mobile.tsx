import SearchIcon from '@assets/svg/search.svg';
import { Flex } from '@components/util/layout/Flex';
import { useSearchParams } from '@hooks/queryString/custom';
import useBooleanState from '@hooks/useBooleanState';

import { FieldValues, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

function SearchMobile() {
  const { register, handleSubmit, reset } = useForm();
  const { setValue: setSearch, deleteKey } = useSearchParams();
  const { bool: isVisible, toggle } = useBooleanState();
  const onSubmit = (value: FieldValues) => {
    if (!value?.search) deleteKey();
    if (value.search) setSearch(value.search);
  };
  const handleCancel = () => {
    toggle();
    reset();
  };

  return (
    <>
      <SearchIcon onClick={toggle} />
      <SLayout onSubmit={handleSubmit(onSubmit)} isVisible={isVisible}>
        <Flex align="center" justify="around">
          <SForm>
            <SSearchWrapper align="center" justify="start">
              <button type="submit">
                <SearchIcon />
              </button>

              <SSearchInput
                type="text"
                placeholder="모임 검색"
                {...register('search')}
              />
            </SSearchWrapper>
          </SForm>

          <SCancelButton onClick={handleCancel}>취소</SCancelButton>
        </Flex>
      </SLayout>
    </>
  );
}

export default SearchMobile;
const SLayout = styled('div', {
  width: 0,
  height: '100vh',
  visibility: 'hidden',
  position: 'fixed',
  top: '56px',
  right: 0,
  zIndex: 5,
  backgroundColor: '$black100',
  transition: 'width 0.5s',
  variants: {
    isVisible: {
      true: {
        width: '100vw',
        visibility: 'visible',
      },
    },
  },
});
const SForm = styled('form', {
  width: '80%',
});
const SSearchWrapper = styled(Flex, {
  width: '100%',
  py: '$13',
  px: '$24',
  backgroundColor: '$black80',
  borderRadius: '59px',
  boxSizing: 'border-box',
});

const SSearchInput = styled('input', {
  width: '200px',
  color: '$white',
  fontAg: '18_medium_100',
  ml: '$10',
  '&::placeholder': {
    fontAg: '18_medium_100',
  },
});

const SCancelButton = styled('button', {
  flexType: 'center',
  color: '$white',
});

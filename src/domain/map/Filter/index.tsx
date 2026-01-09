import { CATEGORY_FILTER } from '@domain/map/Filter/constants';
import MapDropDownFilter from '@domain/map/Filter/DropDown';
import OrderFilter from '@domain/map/Filter/OrderFilter';
import { ORDER_OPTIONS } from '@domain/map/Filter/OrderFilter/constant';
import FilterResetButton from '@domain/map/Filter/Reset';
import Search from '@domain/map/Filter/Search';
import { useSortTypeParams } from '@hook/queryString/custom';
import { useDisplay } from '@hook/useDisplay';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { styled } from 'stitches.config';

const Filter = () => {
  const { isDesktop } = useDisplay();
  const { value: sortType, setValue: setSortType } = useSortTypeParams();

  const selectedOption = ORDER_OPTIONS.find(opt => opt.value === sortType) ?? ORDER_OPTIONS[0];

  const handleSelectOrderBy = (newValue: string) => {
    setSortType(newValue);
  };

  return isDesktop ? (
    <>
      <SSearchWrapper>
        <Search />
        <MapDropDownFilter filter={CATEGORY_FILTER} width={'160px'} />
        <FilterResetButton />
      </SSearchWrapper>
      <SFilterWrapper>
        <SMeetingCount>{999}개의 장소</SMeetingCount>
        <OrderFilter value={selectedOption} options={ORDER_OPTIONS} onChange={handleSelectOrderBy} />
      </SFilterWrapper>
    </>
  ) : (
    <>
      <Search />
      <SMeetingCount>{999}개의 장소</SMeetingCount>
      <Flex align="center" justify="between" style={{ marginTop: '20px' }}>
        <MapDropDownFilter filter={CATEGORY_FILTER} width={'160px'} />
        <OrderFilter value={selectedOption} options={ORDER_OPTIONS} onChange={handleSelectOrderBy} />
      </Flex>
    </>
  );
};

const SSearchWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  mt: '$45',
  mb: '$30',
});

const SFilterWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: '$30',
});

const SMeetingCount = styled('p', {
  ...fontsObject.TITLE_5_18_SB,

  '@tablet': {
    ...fontsObject.TITLE_6_16_SB,
    mt: '$28',
  },

  '@mobile': {
    ...fontsObject.HEADING_7_16_B,
  },
});

export default Filter;

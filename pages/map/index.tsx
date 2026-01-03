import MapDropDownFilter from '@domain/map/Filter/DropDown';
import OrderFilter from '@domain/map/Filter/OrderFilter';
import { ORDER_OPTIONS } from '@domain/map/Filter/OrderFilter/constant';
import FilterResetButton from '@domain/map/Filter/Reset';
import Search from '@domain/map/Filter/Search';
import MapList from '@domain/map/MapList';
import Pagination from '@domain/map/Pagination';
import { usePageParams, useSortTypeParams } from '@hook/queryString/custom';
import { useDisplay } from '@hook/useDisplay';
import CrewTab from '@shared/CrewTab';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { useState } from 'react';
import { styled } from 'stitches.config';

export const CATEGORY_OPTIONS = ['카페', '음식점', '기타'];

export const CATEGORY_FILTER = {
  label: '카테고리',
  subject: 'category',
  options: CATEGORY_OPTIONS,
};

const MapPage = () => {
  const { isDesktop } = useDisplay();
  const [orderBy, setOrderBy] = useState(ORDER_OPTIONS[0]);
  const { setValue: setSortType } = useSortTypeParams();
  const { value: page, setValue: setPage } = usePageParams();

  const handleSelectOrderBy = (newValue: string) => {
    const selectedOption = ORDER_OPTIONS.find(opt => opt.value === newValue);

    if (selectedOption) {
      setOrderBy(selectedOption);
      setSortType(selectedOption.value);
    }
  };

  return (
    <div>
      <CrewTab />
      {isDesktop ? (
        <>
          <SSearchWrapper>
            <Search />
            <MapDropDownFilter filter={CATEGORY_FILTER} width={'160px'} />
            <FilterResetButton />
          </SSearchWrapper>
          <SFilterWrapper>
            <SMeetingCount>{999}개의 장소</SMeetingCount>
            <OrderFilter value={orderBy} options={ORDER_OPTIONS} onChange={handleSelectOrderBy} />
          </SFilterWrapper>

          <MapList />

          <SPageWrapper>
            <Pagination totalPageLength={100} currentPage={Number(page)} onPageChange={setPage} />
          </SPageWrapper>
        </>
      ) : (
        <>
          <Search />
          <SMeetingCount>{999}개의 장소</SMeetingCount>
          <Flex align="center" justify="between" style={{ marginTop: '20px' }}>
            <MapDropDownFilter filter={CATEGORY_FILTER} width={'160px'} />
            <OrderFilter value={orderBy} options={ORDER_OPTIONS} onChange={handleSelectOrderBy} />
          </Flex>

          <MapList />
        </>
      )}
    </div>
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

const SPageWrapper = styled('div', {
  mt: '$120',
  mb: '$80',

  '@mobile': {
    mb: '$60',
  },
});

export default MapPage;

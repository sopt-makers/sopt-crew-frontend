import DropDownFilter from '@domain/list/Filter/DropDown';
import Search from '@domain/list/Filter/Search';
import MapList from '@domain/map/MapList';
import CrewTab from '@shared/CrewTab';
import { styled } from 'stitches.config';

export const CATEGORY_OPTIONS = ['카페', '음식점', '기타'];

export const CATEGORY_FILTER = {
  label: '카테고리',
  subject: 'category',
  options: CATEGORY_OPTIONS,
};

const MapPage = () => {
  return (
    <div>
      <CrewTab />
      <SFilterWrapper>
        <Search />
        <DropDownFilter filter={CATEGORY_FILTER} width={'160px'} />
      </SFilterWrapper>

      <MapList />
    </div>
  );
};

const SFilterWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  mt: '$45',
  mb: '$30',
});

export default MapPage;

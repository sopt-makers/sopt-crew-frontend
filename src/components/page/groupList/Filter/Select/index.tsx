import { useMultiQueryString } from '@hooks/queryString';

import { FilterType } from '@components/page/groupList/Filter';
import MultiSelect from '@components/filter/MultiSelect';
// headless ui로 제작용 import, 제가 나중에 지울꼐야
// import Select from '@components/filter/Select';

interface SelectProps {
  filter: FilterType;
}

function FilterSelect({ filter }: SelectProps) {
  const {
    value: selectedFilterValue,
    // setValue: setFilterOption,
    addValue: addFilterOption,
    deleteValue: deleteFilterOption,
  } = useMultiQueryString(filter.subject, true);

  return (
    <MultiSelect
      selectListData={filter}
      selectedValues={selectedFilterValue}
      addValue={addFilterOption}
      deleteValue={deleteFilterOption}
    />
  );
}
export default FilterSelect;

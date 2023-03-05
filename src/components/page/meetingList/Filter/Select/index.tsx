import { useMultiQueryString } from '@hooks/queryString';

import { FilterType } from '@components/page/meetingList/Filter';
import MultiSelect from '@components/filter/MultiSelect';

interface SelectProps {
  filter: FilterType;
}

function FilterSelect({ filter }: SelectProps) {
  const {
    value: selectedFilterValue,
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

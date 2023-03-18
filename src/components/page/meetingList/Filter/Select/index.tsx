import { useMultiQueryString } from '@hooks/queryString';
import MultiSelect from '@components/filter/MultiSelect';
import { FilterType } from '../Modal';

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

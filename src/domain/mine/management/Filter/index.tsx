import { FilterType } from '@constant/option';
import FilterSelect from '@domain/list/Filter/Select';
import { Flex } from '@shared/util/layout/Flex';

const FILTERS: FilterType[] = [
  {
    label: '승인 상태',
    subject: 'status',
    options: ['대기', '승인', '거절'],
  },
];

function Filter() {
  return (
    <Flex>
      {FILTERS.map(filter => (
        <FilterSelect key={filter.label} filter={filter} />
      ))}
    </Flex>
  );
}

export default Filter;

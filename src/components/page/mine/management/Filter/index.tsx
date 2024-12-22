import FilterSelect from '@components/page/list/Filter/Select';
import { Flex } from '@components/util/layout/Flex';
import { FilterType } from '@constants/option';

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

import { FilterType } from '@components/page/meetingList/Filter';
import FilterSelect from '@components/page/meetingList/Filter/Select';
import { Flex } from '@components/util/layout/Flex';

const FILTERS: FilterType[] = [
  {
    label: '신청 유형',
    subject: 'type',
    options: ['신청', '초대'],
  },
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

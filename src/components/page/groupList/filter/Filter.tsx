import { Flex } from '@components/util/layout/Flex';
import Result from './Result';
import Search from './Search';
import Select from './Select';

export interface OptionType {
  name: string;
  value: string;
}

export interface FilterType {
  label: string;
  category: string;
  options: OptionType[];
}

const FILTERS: FilterType[] = [
  {
    label: '카테고리',
    category: 'category',
    options: [
      { name: '스터디', value: 'study' },
      { name: '번개', value: 'lightning' },
      { name: '강연', value: 'riverKite' },
    ],
  },
  {
    label: '모집 상태',
    category: 'status',
    options: [
      { name: '모집 중', value: 'ing' },
      { name: '모집 마감', value: 'end' },
    ],
  },
];
function Filter() {
  return (
    <>
      <Flex align="center" justify="between">
        <Flex>
          {FILTERS.map(filter => (
            <Select key={filter.label} filter={filter} />
          ))}
        </Flex>
        <Search />
      </Flex>
      <Result />
    </>
  );
}

export default Filter;

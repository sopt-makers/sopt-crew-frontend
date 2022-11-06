import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import useGroupListFilter from '@hooks/groupList/useGroupListFilter';
import { SelectListVisionProvider } from '@providers/groupList/SelectListVisionProvider';
import { useRouter } from 'next/router';
import Result from './Result';
import Search from './Search';
import Select from './Select';

export interface OptionType {
  name: string;
  value: string;
}
export type CategoryType = 'category' | 'status';
export interface FilterType {
  label: string;
  category: CategoryType;
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
  const { search, addFilterOptions, deleteFilterOptions } =
    useGroupListFilter();

  return (
    <SelectListVisionProvider>
      <Flex align="center" justify="between">
        <Flex>
          {FILTERS.map(filter => (
            <Select
              key={filter.label}
              filter={filter}
              addFilterOptions={addFilterOptions(filter.category)}
              deleteFilterOptions={deleteFilterOptions(filter.category)}
            />
          ))}
        </Flex>
        <Search />
      </Flex>
      {!!search && (
        <Box as="p" css={{ fontAg: '24_medium_100', mt: '$24' }}>
          "{search}"에 대한 검색결과입니다.
        </Box>
      )}

      <Result />
    </SelectListVisionProvider>
  );
}

export default Filter;

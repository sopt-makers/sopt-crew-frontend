import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { useSearchParams } from '@hooks/queryString/custom';
import { SelectListVisionProvider } from '@providers/groupList/SelectListVisionProvider';
import Result from './Result';
import Search from './Search';
import Select from './Select';

export type SubjectType = 'category' | 'status';
export interface FilterType {
  label: string;
  subject: SubjectType;
  options: string[];
}

const FILTERS: FilterType[] = [
  {
    label: '카테고리',
    subject: 'category',
    options: ['스터디', '번개', '강연'],
  },
  {
    label: '모집 상태',
    subject: 'status',
    options: ['모집 중', '모집 마감'],
  },
];

function Filter() {
  const { value: search } = useSearchParams();

  return (
    <SelectListVisionProvider>
      <Flex align="center" justify="between">
        <Flex>
          {FILTERS.map(filter => (
            <Select key={filter.label} filter={filter} />
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

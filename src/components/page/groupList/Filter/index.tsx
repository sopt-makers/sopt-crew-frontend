import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { useSearchParams } from '@hooks/queryString/custom';
import Search from './Search';
import FilterSelect from './Select';
import Result from './Result';

export interface FilterType {
  label: string;
  subject: string;
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
    options: ['모집 전', '모집 중', '모집 마감'],
  },
];

function Filter() {
  const { value: search } = useSearchParams();

  return (
    <>
      <Flex align="center" justify="between">
        <Flex>
          {FILTERS.map(filter => (
            <FilterSelect key={filter.label} filter={filter} />
          ))}
        </Flex>

        <Search />
      </Flex>

      <Result />

      {!!search && (
        <Box
          as="p"
          css={{
            fontAg: '24_medium_100',
            mt: '$80',
            '@mobile': { display: 'none' },
          }}
        >
          "{search}"에 대한 검색결과입니다.
        </Box>
      )}
    </>
  );
}

export default Filter;

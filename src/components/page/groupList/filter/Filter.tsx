import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import useBooleanState from '@hooks/useBooleanState';
import { useFilterContext } from '@providers/groupList/FilterProvider';
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
  const { search } = useFilterContext();
  const {
    bool: isCategoryListVisible,
    setFalse: categoryListSetFalse,
    toggle: categoryListToggle,
  } = useBooleanState();

  const {
    bool: isStatusListVisible,
    setFalse: statusSetFalse,
    toggle: statusListToggle,
  } = useBooleanState();

  const isSelectListVisible = {
    category: isCategoryListVisible,
    status: isStatusListVisible,
  };
  const setFalseSelectList = (category: string) => {
    if (category === 'category') categoryListSetFalse();
    if (category === 'status') statusSetFalse();
  };
  const toggleSelectList = (category: string) => {
    if (category === 'category') categoryListToggle();
    if (category === 'status') statusListToggle();
  };
  return (
    <>
      <Flex align="center" justify="between">
        <Flex>
          {FILTERS.map(filter => (
            <Select
              key={filter.label}
              isSelectListVisible={
                isSelectListVisible[filter.category as 'category' | 'status']
              }
              setFalseSelectList={setFalseSelectList}
              toggleSelectList={toggleSelectList}
              filter={filter}
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
    </>
  );
}

export default Filter;

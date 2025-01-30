import { styled } from 'stitches.config';
import { Flex } from '@components/util/layout/Flex';
import { useSearchParams } from '@hooks/queryString/custom';
import Search from './Search';
import ArrowRightCircleIcon from '@assets/svg/arrow_right_circle.svg';
import Toggle from './Modal/Toggle';
import { PART_FILTER } from '@constants/option';
import DropDownFilter from './DropDown';

function Filter() {
  const { value: search } = useSearchParams();

  return (
    <>
      <Flex align="center" justify="between">
        <Flex>
          <Search />
          <DropDownFilter filter={PART_FILTER} />
          <Toggle />
        </Flex>

        <SGuideButton
          target="_blank"
          href="https://www.notion.so/sopt-makers/eec46a4562ec48f0b0220153bb6ea68e"
          rel="noreferrer noopener"
        >
          모임 신청 가이드
          <ArrowRightCircleIcon />
        </SGuideButton>
      </Flex>

      {!!search && <SearchResultMessage>"{search}"에 대한 검색결과입니다.</SearchResultMessage>}
    </>
  );
}

export default Filter;

const SGuideButton = styled('a', {
  height: '$48',
  flexType: 'verticalCenter',
  gap: '$8',
  color: '$gray10',
  padding: '$18 $20',
  //border: '1px solid $gray10',
  borderRadius: '14px',
  fontAg: '18_semibold_100',
  boxSizing: 'border-box',
  '@tablet': {
    padding: '$14 $12 $14 $16',
    borderRadius: '10px',
    fontAg: '14_medium_100',
  },

  path: {
    stroke: '$gray10',
  },
});

const SearchResultMessage = styled('p', {
  fontAg: '24_medium_100',
  mt: '$80',
  '@tablet': { display: 'none' },
});

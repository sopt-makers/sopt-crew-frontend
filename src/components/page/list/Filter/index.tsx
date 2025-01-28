import { styled } from 'stitches.config';
import { Flex } from '@components/util/layout/Flex';
import { useSearchParams } from '@hooks/queryString/custom';
import Search from './Search';
import Result from './Result';
import ArrowRightCircleIcon from '@assets/svg/arrow_right_circle.svg';
import FilterModalOpenButton from './Modal/OpenButton';

function Filter() {
  const { value: search } = useSearchParams();

  return (
    <>
      <Flex align="center" justify="between">
        <Flex>
          <FilterModalOpenButton />
          <Search />
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

      {/*필터 적용 결과 박스 (chip 모임)*/}
      <Result />

      {!!search && <SearchResultMessage>"{search}"에 대한 검색결과입니다.</SearchResultMessage>}
    </>
  );
}

export default Filter;

const SGuideButton = styled('a', {
  flexType: 'verticalCenter',
  gap: '$8',
  color: '$gray10',
  padding: '$18 $20',
  //border: '1px solid $gray10',
  borderRadius: '14px',
  fontAg: '18_medium_100',
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

import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { useSearchParams } from '@hooks/queryString/custom';
import Search from './Search';
import Result from './Result';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
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
          href="https://golden-rib-2f1.notion.site/SOPT-Playground-e75e8895b9e54445b12994128646dcf4"
          rel="noreferrer noopener"
        >
          모임 신청 가이드
          <ArrowSmallRightIcon />
        </SGuideButton>
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

const SGuideButton = styled('a', {
  flexType: 'verticalCenter',
  gap: '$8',
  color: '$purple100',
  padding: '$18 $20',
  border: '1px solid $purple100',
  borderRadius: '14px',
  fontAg: '18_medium_100',

  '@mobile': {
    padding: '$15 $10 $15 $16',
    borderRadius: '10px',
    fontAg: '14_medium_100',
  },

  path: {
    stroke: '$purple100',
  },
});

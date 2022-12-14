import { Flex } from '@components/util/layout/Flex';
import { bindThePages } from '@utils/bindThePages';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';
import ArrowButton from '@components/button/Arrow';
interface PaginationProps {
  totalPagesLength?: number;
  currentPageIndex?: number;
  changeCurrentPage: (value: number) => void;
}
function Pagination({
  totalPagesLength = 1,
  currentPageIndex = 1,
  changeCurrentPage,
}: PaginationProps) {
  const BUNDLE_SIZE = 5;

  const [pagesIndex, setPagesIndex] = useState(0);

  const pagesBundle = bindThePages(totalPagesLength, BUNDLE_SIZE);
  const prevBundle = () => {
    changeCurrentPage(currentPageIndex - BUNDLE_SIZE);
  };
  const nextBundle = () => {
    changeCurrentPage(currentPageIndex + BUNDLE_SIZE);
  };

  useEffect(() => {
    setPagesIndex(Math.floor((currentPageIndex - 1) / BUNDLE_SIZE));
  }, [currentPageIndex]);

  return (
    <Flex align="center" justify="center">
      <Flex align="center">
        <ArrowButton
          direction="left"
          disabled={pagesIndex === 0}
          onClick={pagesIndex === 0 ? () => {} : prevBundle}
        />
        <Flex css={{ mx: '$24', '@mobile': { mx: '$10' } }} as="ul">
          {pagesBundle[pagesIndex]?.map((item, idx) => (
            <SPageLink
              key={idx}
              isCurrent={currentPageIndex === item}
              onClick={() => changeCurrentPage(item)}
            >
              {item}
            </SPageLink>
          ))}
        </Flex>

        <ArrowButton
          direction="right"
          disabled={pagesBundle.length - 1 <= pagesIndex}
          onClick={pagesBundle.length - 1 <= pagesIndex ? () => {} : nextBundle}
        />
      </Flex>
    </Flex>
  );
}

export default Pagination;

const SPageLink = styled('li', {
  flexType: 'center',
  width: '40px',
  height: '40px',
  fontAg: '18_bold_100',
  cursor: 'pointer',
  variants: {
    isCurrent: {
      true: {
        backgroundColor: '$purple100',
        borderRadius: '20px',
      },
    },
  },
  '& + &': {
    ml: '$12',
  },

  '@mobile': {
    width: '$24',
    height: '$24',
    fontAg: '14_bold_100',
    '& + &': {
      ml: '$10',
    },
  },
});

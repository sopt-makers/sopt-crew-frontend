import { Flex } from '@components/util/layout/Flex';
import { bindThePages } from '@utils/bindThePages';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';
import { ArrowButton } from '@components/button/Arrow';
import { ampli } from '@/ampli';
interface PaginationProps {
  totalPagesLength?: number;
  currentPageIndex?: number;
  changeCurrentPage: (value: number) => void;
}

function Pagination({ totalPagesLength = 1, currentPageIndex = 1, changeCurrentPage }: PaginationProps) {
  const path = window.location.pathname;
  const isMainPage = path === '/group' || path === '/group/';
  const BUNDLE_SIZE = 5;

  const [pagesIndex, setPagesIndex] = useState(0);

  const pagesBundle = bindThePages(totalPagesLength, BUNDLE_SIZE);

  const prevBundle = () => {
    const prevBundleLastPage = Math.floor((currentPageIndex - 1) / BUNDLE_SIZE) * BUNDLE_SIZE;
    if (isMainPage) {
      ampli.clickPaginationArrow({ page: prevBundleLastPage });
    }
    changeCurrentPage(prevBundleLastPage);
  };

  const nextBundle = () => {
    const nextBundleFirstPage = Math.ceil(currentPageIndex / BUNDLE_SIZE) * BUNDLE_SIZE + 1;
    if (isMainPage) {
      ampli.clickPaginationArrow({ page: nextBundleFirstPage });
    }
    changeCurrentPage(nextBundleFirstPage);
  };

  const handlePageLinkClick = (item: number) => {
    if (isMainPage) {
      ampli.clickPaginationNumber({ page: item });
    }
    changeCurrentPage(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setPagesIndex(Math.floor((currentPageIndex - 1) / BUNDLE_SIZE));
  }, [currentPageIndex]);

  return (
    <Flex align="center" justify="center">
      <Flex align="center">
        <SArrowButton direction="left" disabled={pagesIndex === 0} onClick={pagesIndex === 0 ? () => {} : prevBundle} />
        <Flex css={{ mx: '$24', '@tablet': { mx: '$10' } }} as="ul">
          {pagesBundle[pagesIndex]?.map((item, idx) => (
            <SPageLink key={idx} isCurrent={currentPageIndex === item} onClick={() => handlePageLinkClick(item)}>
              {item}
            </SPageLink>
          ))}
        </Flex>
        <SArrowButton
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
  fontStyle: 'H3',
  cursor: 'pointer',
  color: '$gray40',
  variants: {
    isCurrent: {
      true: {
        color: '$black100',
        backgroundColor: '$white100',
        borderRadius: '20px',
      },
    },
  },
  '& + &': {
    ml: '$12',
  },

  '@tablet': {
    width: '$24',
    height: '$24',
    fontAg: '14_bold_100',
    '& + &': {
      ml: '$10',
    },
  },
});

const SArrowButton = styled(ArrowButton, {
  '@tablet': {
    '& svg': {
      width: '12px',
      height: '12px',
    },
  },
});

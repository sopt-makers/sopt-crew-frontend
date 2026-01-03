import { ArrowButton } from '@common/button/Arrow';
import { usePagination } from '@hook/usePagination';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { styled } from 'stitches.config';

interface PaginationProps {
  totalPageLength: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPageLength, currentPage, onPageChange }: PaginationProps) {
  const { visiblePages, isFirstGroup, isLastGroup, handlePrevGroup, handleNextGroup, handlePageClick } = usePagination({
    totalCount: totalPageLength,
    currentPage,
    onChange: onPageChange,
    pageSize: 5,
  });

  return (
    <Flex align="center" justify="center">
      <Flex align="center">
        <SArrowButton direction="left" disabled={isFirstGroup} onClick={isFirstGroup ? undefined : handlePrevGroup} />
        <Flex css={{ mx: '$24', '@media (max-width: 768px)': { mx: '$10' } }} as="ul">
          {visiblePages.map(page => (
            <SPageLink key={page} isCurrent={currentPage === page} onClick={() => handlePageClick(page)}>
              {page}
            </SPageLink>
          ))}
        </Flex>

        <SArrowButton direction="right" disabled={isLastGroup} onClick={isLastGroup ? undefined : handleNextGroup} />
      </Flex>
    </Flex>
  );
}

export default Pagination;

const SPageLink = styled('li', {
  flexType: 'center',
  width: '$40',
  height: '$40',
  ...fontsObject.HEADING_6_18_B,
  cursor: 'pointer',
  color: '$gray200',
  variants: {
    isCurrent: {
      true: {
        color: '$gray950',
        backgroundColor: '$gray10',
        borderRadius: '20px',
      },
    },
  },
  '& + &': {
    ml: '$12',
  },

  '@media (max-width: 768px)': {
    width: '$24',
    height: '$24',
    fontAg: '14_bold_100',
    '& + &': {
      ml: '$10',
    },
  },
});

const SArrowButton = styled(ArrowButton, {
  '@media (max-width: 768px)': {
    '& svg': {
      width: '$12',
      height: '$12',
    },
  },
});

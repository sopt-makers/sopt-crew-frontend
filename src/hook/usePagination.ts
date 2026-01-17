import { bindThePages } from '@util/bindThePages';

interface UsePaginationProps {
  totalCount: number;
  pageSize?: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export const usePagination = ({ totalCount, pageSize = 5, currentPage, onChange }: UsePaginationProps) => {
  const pageGroups = bindThePages(totalCount, pageSize);

  const currentGroupIndex = Math.floor((currentPage - 1) / pageSize);

  const visiblePages = pageGroups[currentGroupIndex] || [];

  const handlePrevGroup = () => {
    const prevPage = Math.floor((currentPage - 1) / pageSize) * pageSize;
    if (prevPage > 0) onChange(prevPage);
  };

  const handleNextGroup = () => {
    const nextPage = Math.ceil(currentPage / pageSize) * pageSize + 1;
    if (nextPage <= totalCount) onChange(nextPage);
  };

  const handlePageClick = (page: number) => {
    onChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    visiblePages,
    isFirstGroup: currentGroupIndex === 0,
    isLastGroup: currentGroupIndex >= pageGroups.length - 1,
    handlePrevGroup,
    handleNextGroup,
    handlePageClick,
  };
};

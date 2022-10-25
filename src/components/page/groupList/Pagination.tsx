import { Flex } from '@components/util/layout/Flex';
import { paginationDivision } from '@utils/paginationDivision';
import { useState } from 'react';
import { styled } from 'stitches.config';

function Pagination() {
  const [pagesIndex, setPagesIndex] = useState(0);
  const pagesChunk = paginationDivision(20);

  return (
    <Flex align="center" justify="center">
      <Flex>
        {pagesChunk[pagesIndex]?.map((item, idx) => (
          <PageLink key={idx} isCurrent={true}>
            {item}
          </PageLink>
        ))}
      </Flex>
    </Flex>
  );
}

export default Pagination;

const PageLink = styled('li', {
  flexType: 'center',
  width: '40px',
  height: '40px',
  fontAg: '18_bold_100',
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
});

import { Flex } from '@components/util/layout/Flex';
import { paginationDivision } from '@utils/paginationDivision';
import { useState } from 'react';
import { styled } from 'stitches.config';
import ArrowButton from '@components/button/Arrow';

function Pagination() {
  const [pagesIndex, setPagesIndex] = useState(0);
  const pagesChunk = paginationDivision(20);

  return (
    <Flex align="center" justify="center">
      <Flex>
        <ArrowButton direction="left" disabled={true} />
        <Flex css={{ mx: '$24' }}>
          {pagesChunk[pagesIndex]?.map((item, idx) => (
            <SPageLink key={idx} isCurrent={false}>
              {item}
            </SPageLink>
          ))}
        </Flex>

        <ArrowButton direction="right" />
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
});

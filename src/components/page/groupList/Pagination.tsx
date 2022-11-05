import { Flex } from '@components/util/layout/Flex';
import { paginationDivision } from '@utils/paginationDivision';
import { useState } from 'react';
import { CSSType, styled } from 'stitches.config';
import React from 'react';
import ArrowBigLeftIcon from '@assets/svg/arrow_big_left.svg';

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

interface ArrowButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  css?: CSSType;
  direction: 'right' | 'top' | 'left' | 'bottom';
  disabled?: boolean;
}

export const ArrowButton = ({
  css,
  onClick,
  direction = 'left',
  disabled = false,
}: ArrowButtonProps) => {
  return (
    <SButton
      css={{ ...css }}
      disabled={disabled}
      onClick={onClick}
      direction={direction}
    >
      <ArrowBigLeftIcon />
    </SButton>
  );
};

const SButton = styled('button', {
  width: '$40',
  height: '$40',
  p: '$8',
  '& svg': {
    display: 'block',
    margin: '0 auto',
  },

  variants: {
    direction: {
      right: {
        transform: 'rotate(180deg)',
      },
      top: {
        transform: 'rotate(90deg)',
      },
      left: {},
      bottom: {
        transform: 'rotate(270deg)',
      },
    },
    disabled: {
      true: {
        path: {
          stroke: '$black20',
        },
        cursor: 'not-allowed',
      },
      false: {
        path: {
          stroke: '$white',
        },
      },
    },
  },
});

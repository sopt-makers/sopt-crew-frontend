import { Box } from '@components/box/Box';
import React from 'react';
import { styled } from 'stitches.config';
import ArrowBigLeftIcon from '@assets/svg/arrow_big_left.svg';

interface NextArrowProps {
  className: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const NextArrow = ({ className, onClick }: NextArrowProps) => {
  return (
    <SButton className={className} onClick={onClick}>
      <ArrowBigLeftIcon />
    </SButton>
  );
};

export default NextArrow;

const SButton = styled('button', {
  width: '$72',
  height: '$72',
  cursor: 'pointer',

  '& svg': {
    display: 'block',
    margin: '0 auto',
    padding: '$24',
  },

  '& path': {
    stroke: '$black20',
  },

  '&:hover': {
    path: {
      stroke: '$white',
    },
  },
});

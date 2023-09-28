import React from 'react';
import { styled } from 'stitches.config';
import ArrowBigLeftIcon from '@assets/svg/arrow_big_left.svg';

interface NextArrowProps {
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

  '@tablet': {
    display: 'none',
  },

  '& svg': {
    display: 'block',
    margin: '0 auto',
    padding: '$24',
    width: '100%',
    height: '100%',
  },

  '& path': {
    stroke: '$black40',
  },

  '&:hover': {
    backgroundColor: '$black80',
    borderRadius: '20px',
    path: {
      stroke: '$white100',
    },
  },
});

import React from 'react';
import { styled } from 'stitches.config';
import ArrowBigLeftIcon from '@assets/svg/arrow_big_left.svg';
import { ampli } from '@/ampli';

interface NextArrowProps {
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  total: number;
}

const NextArrow = ({ className, onClick, total }: NextArrowProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ampli.clickCarouselArrow({ image_total: total });
    onClick?.(e);
  };

  return (
    <SButton className={className} onClick={e => handleClick(e)}>
      <ArrowBigLeftIcon />
    </SButton>
  );
};

export default NextArrow;

const SButton = styled('button', {
  width: '$72',
  height: '$72',
  cursor: 'pointer',

  '@media (max-width: 768px)': {
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
    stroke: '$gray600',
  },

  '&:hover': {
    backgroundColor: '$gray800',
    borderRadius: '20px',
    path: {
      stroke: '$gray10',
    },
  },
});

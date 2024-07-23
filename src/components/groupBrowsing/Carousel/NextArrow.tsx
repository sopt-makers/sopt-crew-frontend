import React from 'react';
import { styled } from 'stitches.config';
import Arrow from '@assets/svg/group_browsing_arrow_left.svg';
import { ampli } from '@/ampli';

interface NextArrowProps {
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  total: number;
  activeSlide: number;
  cardListLength: number;
}

const NextArrow = ({ className, onClick, total, activeSlide, cardListLength }: NextArrowProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ampli.clickCarouselArrow({ image_total: total });
    onClick?.(e);
  };

  return (
    <SButton className={className} onClick={e => handleClick(e)}>
      <Arrow />
    </SButton>
  );
};

export default NextArrow;

const SButton = styled('button', {
  width: '$40',
  height: '$40',
  cursor: 'pointer',

  '@tablet': {
    display: 'none',
  },

  '& svg': {
    display: 'block',
    margin: '0 auto',
    width: '100%',
    height: '100%',

    '& circle, & rect': {
      transition: 'fill 0.1s ease-in-out',
    },

    '&:hover circle': {
      fill: '$gray700',
    },

    '&:not(:hover)': {
      transition: 'background 0.1s ease-in-out',
    },
  },
});

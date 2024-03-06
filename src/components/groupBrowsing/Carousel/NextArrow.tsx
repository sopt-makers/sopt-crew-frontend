import React, { useEffect, useState } from 'react';
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

  console.log(activeSlide / 4 + 1);
  console.log(cardListLength / 4);
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
  },
});

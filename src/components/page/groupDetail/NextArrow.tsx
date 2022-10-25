import { Box } from '@components/box/Box';
import BigArrowIcon from '@components/icon/ArrowIcon';
import React from 'react';
import { styled } from 'stitches.config';

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const NextArrow = ({ onClick }: NextArrowProps) => {
  return (
    <SButton onClick={onClick}>
      <BigArrowIcon />
    </SButton>
  );
};

export default NextArrow;

const SButton = styled(Box, {
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

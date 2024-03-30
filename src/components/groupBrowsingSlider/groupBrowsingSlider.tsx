import { styled } from 'stitches.config';
import React from 'react';
import MobileSizeCard from '@components/groupBrowsing/mobileSizeCard';

const GroupBrowsingSlider = () => {
  return (
    <SSlider>
      {[0, 0, 0, 0, 0, 0, 0, 0].map((item, idx) => (
        <MobileSizeCard key={idx} />
      ))}{' '}
    </SSlider>
  );
};

export default GroupBrowsingSlider;

const SSlider = styled('div', {
  display: 'flex',
  gap: '$12',
  overflowX: 'auto',
});

import { styled } from 'stitches.config';
import React from 'react';
import MobileSizeCard from '@components/groupBrowsing/mobileSizeCard';

const GroupBrowsingSlider = () => {
  return (
    <SContainer>
      {[0, 0, 0, 0, 0, 0, 0, 0].map((item, idx) => (
        <MobileSizeCard key={idx} />
      ))}{' '}
    </SContainer>
  );
};

export default GroupBrowsingSlider;

const SContainer = styled('div', {
  display: 'flex',
  gap: '$12',
  overflowX: 'auto',
});

import { styled } from 'stitches.config';
import React from 'react';
import MobileSizeCard from '@components/groupBrowsing/mobileSizeCard';
import { GroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';

interface CarouselProps {
  cardList: GroupBrowsingCardResponse;
}

const GroupBrowsingSlider = ({ cardList }: CarouselProps) => {
  return (
    <>
      <SSlider>
        {cardList.map(card => (
          <MobileSizeCard key={card.id} {...card} />
        ))}{' '}
      </SSlider>
    </>
  );
};

export default GroupBrowsingSlider;

const SSlider = styled('div', {
  display: 'flex',
  gap: '$12',
  overflowX: 'auto',
  paddingBottom: '40px',
});

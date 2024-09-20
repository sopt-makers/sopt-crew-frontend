import { styled } from 'stitches.config';
import React from 'react';
import MobileSizeCard from '@components/groupBrowsing/mobileSizeCard';
import { GetGroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';

const GroupBrowsingSlider = ({ cardList }: { cardList: GetGroupBrowsingCardResponse }) => {
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

import { useFlashListQueryOption } from '@api/flash/query';
import Loader from '@common/loader/Loader';
import MobileSizeCard from '@shared/groupBrowsing/GroupBrowsingCard/GroupBrowsingCard';
import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

const GroupBrowsingSlider = () => {
  const cardList = useSuspenseQuery(useFlashListQueryOption()).data?.meetings;

  return (
    <SSlider>
      {cardList.map(card => (
        <MobileSizeCard key={card.id} {...card} />
      ))}{' '}
    </SSlider>
  );
};

export default () => {
  return (
    <Suspense fallback={<Loader />}>
      <GroupBrowsingSlider />
    </Suspense>
  );
};

const SSlider = styled('div', {
  display: 'flex',
  gap: '$12',
  overflow: 'auto hidden',
});

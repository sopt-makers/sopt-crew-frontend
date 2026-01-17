import { useMapEventGiftQueryOption } from '@api/map/query';
import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import ResultEvent from './ResultEvent';

interface SuccessEventProps {
  mapId: number;
}

function SuccessEvent({ mapId }: SuccessEventProps) {
  const { data: mapEventGift } = useSuspenseQuery(useMapEventGiftQueryOption(mapId));

  return <ResultEvent isWinLottery giftUrl={mapEventGift.giftUrl} />;
}

export default ({ mapId }: SuccessEventProps) => (
  <Suspense fallback={null}>
    <SuccessEvent mapId={mapId} />
  </Suspense>
);

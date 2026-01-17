import { useMapEventGiftQueryOption, useMapEventQueryOption } from '@api/map/query';
import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useState } from 'react';
import ResultEvent from './ResultEvent';
import ShakeEvent from './ShakeEvent';

enum FirstRegisterEventStep {
  Shake = 'shake',
  Result = 'result',
}

interface FirstRegisterEventProps {
  mapId: number;
}

function FirstRegisterEvent({ mapId }: FirstRegisterEventProps) {
  const [step, setStep] = useState<FirstRegisterEventStep>(FirstRegisterEventStep.Shake);

  const [{ data: mapEvent }, { data: mapEventGift }] = useSuspenseQueries({
    queries: [useMapEventQueryOption(mapId), useMapEventGiftQueryOption(mapId)],
  });

  const isWinLottery = mapEvent.isWinLottery ?? false;

  const handleEndShake = () => setStep(FirstRegisterEventStep.Result);

  switch (step) {
    case FirstRegisterEventStep.Shake:
      return <ShakeEvent onEndShake={handleEndShake} />;
    case FirstRegisterEventStep.Result:
      return <ResultEvent isWinLottery={isWinLottery} giftUrl={mapEventGift.giftUrl} />;
  }
}

export default ({ mapId }: FirstRegisterEventProps) => (
  <Suspense fallback={null}>
    <FirstRegisterEvent mapId={mapId} />
  </Suspense>
);

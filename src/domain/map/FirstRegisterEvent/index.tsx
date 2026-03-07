import { useMapEventQueryOption } from '@api/map/query';
import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ResultEvent from './ResultEvent';
import ShakeEvent from './ShakeEvent';
import SuccessEvent from './SuccessEvent';

enum FirstRegisterEventStep {
  Shake = 'shake',
  Result = 'result',
}

interface FirstRegisterEventProps {
  mapId: number;
}

function FirstRegisterEvent({ mapId }: FirstRegisterEventProps) {
  const [step, setStep] = useState<FirstRegisterEventStep>(FirstRegisterEventStep.Shake);

  const { data: mapEvent } = useSuspenseQuery(useMapEventQueryOption(mapId));

  const isWinLottery = mapEvent.isWinLottery ?? false;

  const handleEndShake = () => setStep(FirstRegisterEventStep.Result);

  switch (step) {
    case FirstRegisterEventStep.Shake:
      return <ShakeEvent onEndShake={handleEndShake} />;
    case FirstRegisterEventStep.Result:
      if (isWinLottery) {
        return <SuccessEvent mapId={mapId} />;
      }
      return <ResultEvent isWinLottery={false} />;
  }
}

export default ({ mapId }: FirstRegisterEventProps) => (
  <Suspense fallback={null}>
    <FirstRegisterEvent mapId={mapId} />
  </Suspense>
);

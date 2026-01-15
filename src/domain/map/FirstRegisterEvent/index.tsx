import { useState } from 'react';
import ResultEvent from './ResultEvent';
import ShakeEvent from './ShakeEvent';

enum FirstRegisterEventStep {
  Shake = 'shake',
  Result = 'result',
}

function FirstRegisterEvent() {
  const [step, setStep] = useState<FirstRegisterEventStep>(FirstRegisterEventStep.Shake);

  //TODO(@jnary): API 연결
  const isWinLottery = false;

  const handleEndShake = () => setStep(FirstRegisterEventStep.Result);

  switch (step) {
    case FirstRegisterEventStep.Shake:
      return <ShakeEvent onEndShake={handleEndShake} />;
    case FirstRegisterEventStep.Result:
      return <ResultEvent isWinLottery={isWinLottery} />;
  }
}

export default FirstRegisterEvent;

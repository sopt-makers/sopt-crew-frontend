import { useState } from 'react';
import ResultEvent from './ResultEvent';
import ShakeEvent from './ShakeEvent';

enum FirstRegisterEventStep {
  Shake = 'shake',
  Result = 'result',
}

function FirstRegisterEvent() {
  const [step, setStep] = useState<FirstRegisterEventStep>(FirstRegisterEventStep.Shake);

  const handleEndShake = () => setStep(FirstRegisterEventStep.Result);

  switch (step) {
    case FirstRegisterEventStep.Shake:
      return <ShakeEvent onEndShake={handleEndShake} />;
    case FirstRegisterEventStep.Result:
      return <ResultEvent />;
  }
}

export default FirstRegisterEvent;

import useAmplitudeInstance from '@hooks/amplitude/useAmplitudeInstance';
import { PropsWithChildren } from 'react';

const AmplitudeProvider = ({ children }: PropsWithChildren) => {
  useAmplitudeInstance();
  return <div>{children}</div>;
};

export default AmplitudeProvider;

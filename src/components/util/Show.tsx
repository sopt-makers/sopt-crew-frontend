import { PropsWithChildren, ReactNode } from 'react';

interface ShowProps {
  when: boolean;
  fallback?: ReactNode;
}

function Show({ when, fallback = null, children }: PropsWithChildren<ShowProps>) {
  return when ? (children as React.ReactElement) : (fallback as React.ReactElement | null);
}

export default Show;

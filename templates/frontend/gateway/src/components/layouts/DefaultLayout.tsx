import type { ReactNode } from 'react';

import { Navigation } from '../navigation/Navigation';

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

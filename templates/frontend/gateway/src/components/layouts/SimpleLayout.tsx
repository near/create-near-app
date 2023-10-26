import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function SimpleLayout({ children }: Props) {
  return <>{children}</>;
}

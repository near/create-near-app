'use client';

import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import { Navigation } from '@/components/navigation';

// Wallet libraries require browser APIs. Initialize them after hydration.
const NearProvider = dynamic(
  () => import('@/providers/near-provider').then((module) => module.NearProvider),
  { ssr: false },
);

export function Providers({ children }: PropsWithChildren) {
  return <NearProvider><Navigation />{children}</NearProvider>;
}

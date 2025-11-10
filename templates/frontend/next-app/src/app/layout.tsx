'use client';
import '@/app/globals.css';

import { Navigation } from '@/components/navigation';
import { NearProvider } from '@/hooks/useNear';

import { ReactNode } from 'react';

// Layout Component
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <NearProvider>
          <Navigation />
          {children}
        </NearProvider>
      </body>
    </html>
  );
}
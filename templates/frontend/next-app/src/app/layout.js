'use client';

import { useEffect, useState } from 'react';

import '@/app/globals.css';
import { NearContext } from '@/context';
import { Navigation } from '@/components/navigation';
import { NetworkId, HelloNearContract } from '@/config';

import { Wallet } from '@/wallets/near';

const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });

// Layout Component
export default function RootLayout({ children }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { wallet.startUp(setSignedAccountId); }, []);

  return (
    <html lang="en">
      <body>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          <Navigation />
          {children}
        </NearContext.Provider>
      </body>
    </html>
  );
}

'use client'
import './globals.css'
import '@near-wallet-selector/modal-ui/styles.css';

import { ComponentMap, NetworkId } from '@/config';
import { Navigation } from '@/components/navigation';
import { initWallet } from '@/wallets/wallet-selector';

export default function RootLayout({ children }) {

  const createAccessKeyFor = ComponentMap[NetworkId].socialDB;
  initWallet({ createAccessKeyFor });
  
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

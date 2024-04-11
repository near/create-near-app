'use client';

// react
import { useEffect } from "react";
import { create as createStore } from 'zustand';

// app
import './globals.css';
import { Navigation } from '@/components/navigation';
import { NetworkId, HelloNearContract } from '@/config';

// wallet-selector
import { Wallet } from '@/wallets/near-wallet';

// store to share wallet and signedAccountId
export const useStore = createStore((set) => ({
  wallet: undefined,
  signedAccountId: '',
  setWallet: (wallet) => set({ wallet }),
  setSignedAccountId: (signedAccountId) => set({ signedAccountId })
}))

// Layout Component
export default function RootLayout({ children }) {
  const { setWallet, setSignedAccountId } = useStore();

  useEffect(() => {
    const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });
    wallet.startUp(setSignedAccountId);
    setWallet(wallet);
  }, []);

  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

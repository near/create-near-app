import { Contract, WalletConnection } from 'near-api-js';

interface MyContract extends Contract {
  setGreeting(message: string): void;
  getGreeting({ accountId: string }): string | null;
}

declare global {
  interface Window {
    walletConnection: WalletConnection;
    accountId: string;
    contract: MyContract;
    nearInitPromise: Promise<void>;
  }
}

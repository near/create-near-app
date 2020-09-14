import { Contract, WalletConnection } from 'near-api-js'

interface MyContract extends Contract {
  setGreeting(value: { message: string }): void
  getGreeting(value: { accountId: string }): string | null
}

declare global {
  interface Window {
    walletConnection: WalletConnection
    accountId: string
    contract: MyContract
    nearInitPromise: Promise<void>
  }
}

import "@/styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";

import type { AppProps } from "next/app";
import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";
import { Navigation } from "@/components/navigation";
import { HelloNearContract, NetworkId } from "@/config";

// Wallet setups
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupMeteorWalletApp } from "@near-wallet-selector/meteor-wallet-app";
import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";
import { setupHotWallet } from "@near-wallet-selector/hot-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupSender } from "@near-wallet-selector/sender";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";
import { setupUnityWallet } from "@near-wallet-selector/unity-wallet";
import { setupOKXWallet } from "@near-wallet-selector/okx-wallet";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupIntearWallet } from "@near-wallet-selector/intear-wallet";

// Ethereum adapters
import { wagmiAdapter, web3Modal } from "@/wallets/web3modal";

// Types
import type { WalletModuleFactory } from "@near-wallet-selector/core";

const walletSelectorConfig = {
  network: NetworkId,
  modules: [
    setupEthereumWallets({ wagmiConfig: wagmiAdapter.wagmiConfig, web3Modal }),
    setupMeteorWallet(),
    setupMeteorWalletApp({ contractId: HelloNearContract }),
    setupHotWallet(),
    setupLedger(),
    setupSender(),
    setupNearMobileWallet(),
    setupWelldoneWallet(),
    setupMathWallet(),
    setupBitgetWallet(),
    setupRamperWallet(),
    setupUnityWallet({ 
      projectId: "your-project-id",
      metadata: {
        name: "Hello NEAR",
        description: "Hello NEAR Example",
        url: "https://near.org",
        icons: ["https://near.org/favicon.ico"],
      }
    }),
    setupOKXWallet(),
    setupCoin98Wallet(),
    setupIntearWallet(),  
  ] as WalletModuleFactory[]
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletSelectorProvider config={walletSelectorConfig}>
      <Navigation />
      <Component {...pageProps} />
    </WalletSelectorProvider>
  );
}
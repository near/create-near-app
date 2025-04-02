import { injected,walletConnect } from '@wagmi/connectors';
import { createAppKit } from "@reown/appkit/react";
import { reconnect } from "@wagmi/core";
import { nearTestnet } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";


// Get your projectId at https://cloud.reown.com
const projectId = '5bb0fe33763b3bea40b8d69e4269b4ae';

const connectors = [
  walletConnect({
    projectId,
    metadata: {
      name: "Guest-Book-Examples",
      description: "Examples demonstrating integrations with NEAR blockchain",
      url: "https://near.github.io/wallet-selector",
      icons: ["https://near.github.io/wallet-selector/favicon.ico"],
    },
    showQrModal: false, // showQrModal must be false
  }),
  injected({ shimDisconnect: true }),
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  connectors,
  networks: [nearTestnet],
});

reconnect(wagmiAdapter.wagmiConfig);

export const web3Modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [nearTestnet],
  defaultNetwork: nearTestnet,
  enableWalletConnect: true,
  features: {
    analytics: true,
    swaps: false,
    onramp: false,
    email: false, // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
    socials: false, // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
  },
  coinbasePreference: "eoaOnly", // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
});
import { injected,walletConnect } from '@wagmi/connectors';
import { createConfig,http, reconnect } from '@wagmi/core';
import { createWeb3Modal } from '@web3modal/wagmi';

import { EVMWalletChain,NetworkId } from '@/config';

// Config
const near = {
  id: EVMWalletChain.chainId,
  name: EVMWalletChain.name,
  nativeCurrency: {
    decimals: 18,
    name: 'NEAR',
    symbol: 'NEAR',
  },
  rpcUrls: {
    default: { http: [EVMWalletChain.rpc] },
    public: { http: [EVMWalletChain.rpc] },
  },
  blockExplorers: {
    default: {
      name: 'NEAR Explorer',
      url: EVMWalletChain.explorer,
    },
  },
  testnet: NetworkId === 'testnet',
};

// Get your projectId at https://cloud.reown.com
const projectId = '5bb0fe33763b3bea40b8d69e4269b4ae';

export const wagmiConfig = createConfig({
  chains: [near],
  transports: { [near.id]: http() },
  connectors: [walletConnect({ projectId, showQrModal: false }), injected({ shimDisconnect: true })],
});

// Preserve login state on page reload
reconnect(wagmiConfig);

// Modal for login
export const web3Modal = createWeb3Modal({ wagmiConfig, projectId });

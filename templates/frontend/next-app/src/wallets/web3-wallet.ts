'use client';
import type { EIP1193Provider } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import { init, useConnectWallet } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';
import { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

const web3onboardKey = 'web3-onboard:connectedWallets';

const wcV2InitOptions: any = {
  version: 2,
  projectId: '72b7b3359ab477e339a070f615806aa6',
  requiredChains: [1, 56],
};

const walletConnect = walletConnectModule(wcV2InitOptions);
const ledger = ledgerModule(wcV2InitOptions);
const injected = injectedModule();

// initialize Onboard
export const onboard = init({
  wallets: [injected, walletConnect, ledger],
  chains: [
    {
      id: 1,
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://rpc.ankr.com/eth',
    },
    {
      id: 3,
      token: 'ETH',
      label: 'Ropsten - Ethereum Testnet',
      rpcUrl: 'https://rpc.ankr.com/eth_ropsten',
    },
    {
      id: 5,
      token: 'ETH',
      label: 'Goerli - Ethereum Testnet',
      rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    },
    {
      id: 10,
      token: 'ETH',
      label: 'Optimism',
      rpcUrl: 'https://rpc.ankr.com/optimism',
    },
    {
      id: 420,
      token: 'ETH',
      label: 'Optimism Goerli Testnet',
      rpcUrl: 'https://optimism-goerli.publicnode.com',
    },
    {
      id: 56,
      token: 'BNB',
      label: 'Binance Smart Chain Mainnet',
      rpcUrl: 'https://bsc.publicnode.com',
    },
    {
      id: 97,
      token: 'tBNB',
      label: 'Binance Smart Chain Testnet',
      rpcUrl: 'https://bsc-testnet.publicnode.com',
    },
    {
      id: 1313161554,
      token: 'ETH',
      label: 'Aurora Mainnet',
      rpcUrl: 'https://mainnet.aurora.dev',
    },
    {
      id: 1313161555,
      token: 'ETH',
      label: 'Aurora Testnet',
      rpcUrl: 'https://testnet.aurora.dev',
    },
    {
      id: 137,
      token: 'MATIC',
      label: 'Polygon Mainnet',
      rpcUrl: 'https://rpc.ankr.com/polygon',
    },
    {
      id: 80001,
      token: 'MATIC',
      label: 'Polygon Testnet Mumbai',
      rpcUrl: 'https://rpc.ankr.com/polygon_mumbai',
    },
    {
      id: 280,
      token: 'ETH',
      label: 'zkSync Era Testnet',
      rpcUrl: 'https://testnet.era.zksync.dev',
    },
    {
      id: 324,
      token: 'ETH',
      label: 'zkSync Era Mainnet',
      rpcUrl: 'https://zksync2-mainnet.zksync.io',
    },
    {
      id: 1101,
      token: 'ETH',
      label: 'Polygon zkEVM',
      rpcUrl: 'https://zkevm-rpc.com',
    },
    {
      id: 1442,
      token: 'ETH',
      label: 'Polygon zkEVM Testnet',
      rpcUrl: 'https://rpc.public.zkevm-test.net',
    },
    {
      id: 42161,
      token: 'ETH',
      label: 'Arbitrum One Mainnet',
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
    },
    {
      id: 42170,
      token: 'ETH',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc',
    },
    {
      id: 421613,
      token: 'AGOR',
      label: 'Arbitrum Goerli',
      rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    },
    {
      id: 25,
      token: 'CRO',
      label: 'Cronos Mainnet Beta',
      rpcUrl: 'https://evm.cronos.org',
    },
    {
      id: 338,
      token: 'TCRO',
      label: 'Cronos Testnet',
      rpcUrl: 'https://evm-t3.cronos.org',
    },
    {
      id: 100,
      token: 'XDAI',
      label: 'Gnosis',
      rpcUrl: 'https://rpc.ankr.com/gnosis',
    },
    {
      id: 10200,
      token: 'XDAI',
      label: 'Gnosis Chiado Testnet',
      rpcUrl: 'https://rpc.chiadochain.net',
    },
    {
      id: 42220,
      token: 'CELO',
      label: 'Celo Mainnet',
      rpcUrl: 'https://rpc.ankr.com/celo',
    },
    {
      id: 44787,
      token: 'CELO',
      label: 'Celo Alfajores Testnet',
      rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    },
    {
      id: 43114,
      token: 'AVAX',
      label: 'Avalanche C-Chain',
      rpcUrl: 'https://rpc.ankr.com/avalanche',
    },
    {
      id: 43113,
      token: 'AVAX',
      label: 'Avalanche Fuji Testnet',
      rpcUrl: 'https://rpc.ankr.com/avalanche_fuji',
    },
    {
      id: 250,
      token: 'FTM',
      label: 'Fantom Opera',
      rpcUrl: 'https://rpc.ankr.com/fantom',
    },
    {
      id: 4002,
      token: 'FTM',
      label: 'Fantom Testnet',
      rpcUrl: 'https://rpc.ankr.com/fantom_testnet',
    },
    {
      id: 1284,
      token: 'GLMR',
      label: 'Moonbeam',
      rpcUrl: 'https://rpc.ankr.com/moonbeam',
    },
    {
      id: 61,
      token: 'ETC',
      label: 'Ethereum Classic Mainnet',
      rpcUrl: 'https://etc.rivet.link',
    },
    {
      id: 84531,
      token: 'ETH',
      label: 'Base Goerli Testnet',
      rpcUrl: 'https://goerli.base.org',
    },
    {
      id: 8453,
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org',
    },
    {
      id: 5001,
      token: 'MNT',
      label: 'Mantle Testnet',
      rpcUrl: 'https://rpc.testnet.mantle.xyz',
    },
    {
      id: 5000,
      token: 'MNT',
      label: 'Mantle',
      rpcUrl: 'https://rpc.mantle.xyz',
    },
  ],
  appMetadata: {
    name: 'NEAR',
    icon: '/next.svg',
    description: 'NEAR',
  },
  theme: 'dark',
  containerElements: {
    // connectModal: '#near-social-navigation-bar',
    // accountCenter: "#near-social-web3-account",
  },
});

type EthersProviderContext = {
  provider?: EIP1193Provider;
  useConnectWallet: typeof useConnectWallet;
};

const defaultEthersProviderContext: EthersProviderContext = { useConnectWallet };

export const useEthersProviderContext = singletonHook(defaultEthersProviderContext, () => {
  const [{ wallet }] = useConnectWallet();
  const [ethersProvider, setEthersProvider] = useState(defaultEthersProviderContext);

  useEffect(() => {
    (async () => {
      if (typeof localStorage === 'undefined') return;

      const walletsSub = onboard.state.select('wallets');

      walletsSub.subscribe((wallets) => {
        const connectedWallets = wallets.map(({ label }) => label);
        localStorage.setItem(web3onboardKey, JSON.stringify(connectedWallets));
      });

      const previouslyConnectedWallets = JSON.parse(localStorage.getItem(web3onboardKey) || '[]');

      if (previouslyConnectedWallets) {
        // You can also auto connect "silently" and disable all onboard modals to avoid them flashing on page load
        await onboard.connectWallet({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (!wallet) return;

    setEthersProvider({
      provider: wallet.provider,
      useConnectWallet,
    });
  }, [wallet]);

  return ethersProvider;
});
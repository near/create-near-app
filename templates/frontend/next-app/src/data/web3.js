// import { singletonHook } from "react-singleton-hook";
// import { useEffect, useState } from "react";
// import { init, useConnectWallet } from "@web3-onboard/react";
// import injectedModule from "@web3-onboard/injected-wallets";
// import walletConnectModule from "@web3-onboard/walletconnect";
// import ledgerModule from "@web3-onboard/ledger";
// import { ethers } from "ethers";
// import ls from "local-storage";
// import icon from "../images/near_social_icon.svg";

// const web3onboardKey = "web3-onboard:connectedWallets";

// const wcV1InitOptions = {
//   qrcodeModalOptions: {
//     mobileLinks: ["metamask", "argent", "trust"],
//   },
//   connectFirstChainId: true,
// };

// const walletConnect = walletConnectModule(wcV1InitOptions);
// const ledger = ledgerModule();
// const injected = injectedModule();

// // initialize Onboard
// export const onboard = init({
//   wallets: [injected, walletConnect, ledger],
//   chains: [
//     {
//       id: 1,
//       token: "ETH",
//       label: "Ethereum Mainnet",
//       rpcUrl: "https://rpc.ankr.com/eth",
//     },
//     {
//       id: 3,
//       token: "ETH",
//       label: "Ropsten - Ethereum Testnet",
//       rpcUrl: "https://rpc.ankr.com/eth_ropsten",
//     },
//     {
//       id: 5,
//       token: "ETH",
//       label: "Goerli - Ethereum Testnet",
//       rpcUrl: "https://rpc.ankr.com/eth_goerli",
//     },
//     {
//       id: "0x4e454152",
//       token: "ETH",
//       label: "Aurora Mainnet",
//       rpcUrl: "https://mainnet.aurora.dev",
//     },
//     {
//       id: 137,
//       token: "MATIC",
//       label: "Matic Mainnet",
//       rpcUrl: "https://rpc.ankr.com/polygon",
//     },
//     {
//       id: 324,
//       token: "ETH",
//       label: "zkSync",
//       rpcUrl: "https://zksync2-mainnet.zksync.io",
//     },
//     {
//       id: 56,
//       token: "BNB",
//       label: "Binance Smart Chain Mainnet",
//       rpcUrl: "https://bsc.publicnode.com",
//     },
//     {
//       id: 42161,
//       token: "ETH",
//       label: "Arbitrum One Mainnet",
//       rpcUrl: "https://endpoints.omniatech.io/v1/arbitrum/one/public",
//     },
//   ],
//   appMetadata: {
//     name: "NEAR Social",
//     icon,
//     description: "NEAR Social",
//   },
//   theme: "dark",
//   containerElements: {
//     // connectModal: '#near-social-navigation-bar',
//     // accountCenter: "#near-social-web3-account",
//   },
// });

// const defaultEthersProviderContext = { useConnectWallet };

// export const useEthersProviderContext = singletonHook(
//   defaultEthersProviderContext,
//   () => {
//     const [{ wallet }] = useConnectWallet();
//     const [ethersProvider, setEthersProvider] = useState(
//       defaultEthersProviderContext
//     );

//     useEffect(() => {
//       (async () => {
//         const walletsSub = onboard.state.select("wallets");
//         const { unsubscribe } = walletsSub.subscribe((wallets) => {
//           const connectedWallets = wallets.map(({ label }) => label);
//           ls.set(web3onboardKey, connectedWallets);
//         });

//         const previouslyConnectedWallets = ls.get(web3onboardKey) || [];

//         if (previouslyConnectedWallets) {
//           // You can also auto connect "silently" and disable all onboard modals to avoid them flashing on page load
//           await onboard.connectWallet({
//             autoSelect: {
//               label: previouslyConnectedWallets[0],
//               disableModals: true,
//             },
//           });
//         }
//       })();
//     }, []);

//     useEffect(() => {
//       setEthersProvider({
//         provider: wallet?.provider,
//         useConnectWallet,
//       });
//     }, [wallet]);

//     return ethersProvider;
//   }
// );

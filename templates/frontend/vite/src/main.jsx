import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import { NearContext, Wallet } from '@/wallets/near';
import App from './App.jsx';
import { NetworkId } from './config.js';

// Wallet instance
const wallet = new Wallet({ NetworkId: NetworkId });

// Optional: Create an access key so the user does not need to sign transactions. Read more about access keys here: https://docs.near.org/concepts/protocol/access-keys
// const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });

const Root = () => {
  const [signedAccountId, setSignedAccountId] = useState(null);

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <App />
    </NearContext.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
import { Navigation } from './components/navigation';
import Home from './pages/home';
import { Route } from 'wouter';
import HelloNear from './pages/hello_near';
import { useEffect, useState } from 'react';
import { NetworkId } from './config.js';
import { NearContext, Wallet } from '@/wallets/near';

// Wallet instance
const wallet = new Wallet({ NetworkId: NetworkId });

// Optional: Create an access key so the user does not need to sign transactions. Read more about access keys here: https://docs.near.org/concepts/protocol/access-keys
// const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });

function App() {
  const [signedAccountId, setSignedAccountId] = useState(null);

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Navigation />
      <Route path="/" component={Home} />
      <Route path="/hello-near" component={HelloNear}/>
    </NearContext.Provider>
  )
}

export default App

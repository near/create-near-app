import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Wallet } from './near-wallet';
import { Contract } from './near-interface';

const reactRoot = createRoot(document.querySelector('#root'));

// create the Wallet and the Contract
const contractId = process.env.CONTRACT_NAME;
const wallet = new Wallet({contractId: contractId});
const contract = new Contract({wallet: wallet});

window.onload = wallet.startUp()
  .then((isSignedIn) => {
    reactRoot.render(<App isSignedIn={isSignedIn} contract={contract} wallet={wallet} />);
  })
  .catch(e => {
    reactRoot.render(<div style={{color: 'red'}}>Error: <code>{e.message}</code></div>);
    console.error(e);
  });

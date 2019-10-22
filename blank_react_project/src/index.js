import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getConfig from './config.js';
import * as nearlib from 'nearlib';

async function doInitContract() {
    window.nearConfig = getConfig('development')
    console.log("nearConfig", window.nearConfig);

    // Initializing connection to the NEAR node.
    window.near = await nearlib.connect(Object.assign(window.nearConfig, { deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }));
    // Needed to access wallet login
    window.walletAccount = new nearlib.WalletAccount(window.near);


    // Getting the Account ID. If unauthorized yet, it's just empty string.
    window.accountId = window.walletAccount.getAccountId();

    // Initializing near and near client from the nearlib.
    // window.near = new nearlib.Near(new nearlib.NearClient(
    //   window.walletAccount,
    //   // We need to provide a connection to the blockchain node which we're going to use
    //   new nearlib.LocalNodeConnection(nearConfig.nodeUrl),
    // ));

    window.contract = await window.near.loadContract(window.nearConfig.contractName, {
        viewMethods: [
            "hello",],
        changeMethods: [
            ],
        sender: window.accountId
    });
}

window.nearInitPromise = doInitContract().then(() => {
    ReactDOM.render(<App contract={window.contract} wallet={window.walletAccount}/>,
      document.getElementById('root')
    );
  }).catch(console.error)
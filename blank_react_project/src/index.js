import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getConfig from './config.js';
import * as nearlib from 'nearlib';

// Initializing contract
async function InitContract() {
    window.nearConfig = getConfig('development')
    console.log("nearConfig", window.nearConfig);

    // Initializing connection to the NEAR DevNet.
    window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig));
    
    // Needed to access wallet login
    window.walletAccount = new nearlib.WalletAccount(window.near);
    
    // Getting the Account ID. If unauthorized yet, it's just empty string.
    window.accountId = window.walletAccount.getAccountId();

    // Initializing our contract APIs by contract name and configuration.
    window.contract = await window.near.loadContract(window.nearConfig.contractName, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: [
            "welcome",],
            // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [
            ],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId
    });
}

window.nearInitPromise = InitContract().then(() => {
    ReactDOM.render(<App contract={window.contract} wallet={window.walletAccount}/>,
      document.getElementById('root')
    );
  }).catch(console.error)
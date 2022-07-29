import {KeyPair, keyStores} from 'near-api-js';

const fs = require('fs');
const path = require('path');

// first make sure you deployed your contract with dev-deploy, see ../package.json deploy script
// here we take the contract from the auto-generated neardev folder
const CONTRACT_NAME = fs.readFileSync(path.resolve(__dirname, '../../contract/neardev/dev-account'), 'utf-8');
const NETWORK_ID = 'testnet';

// Create an InMemoryKeyStore
const keyStore = new keyStores.InMemoryKeyStore();

// Load credentials
const credPath = `${process.env.HOME}/.near-credentials/${NETWORK_ID}/${CONTRACT_NAME}.json`;
let credentials = JSON.parse(fs.readFileSync(credPath));

// Save key in the key store
keyStore.setKey(
  NETWORK_ID,
  CONTRACT_NAME,
  KeyPair.fromString(credentials.private_key)
);

export const nearConfig = {
  networkId: NETWORK_ID,
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: CONTRACT_NAME,
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {},
  deps: {keyStore}
};
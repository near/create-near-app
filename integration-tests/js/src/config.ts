const CONTRACT_NAME='dev-1654004590756-55570380119998'
const NETWORK_ID='testnet'

// Imports
const fs = require('fs')
import { keyStores, KeyPair } from 'near-api-js'

// Create an InMemoryKeyStore
const keyStore = new keyStores.InMemoryKeyStore()

// Load credentials
const credPath = `${process.env.HOME}/.near-credentials/${NETWORK_ID}/${CONTRACT_NAME}.json`
let credentials = JSON.parse(fs.readFileSync(credPath))

// Save key in the key store
keyStore.setKey(
  NETWORK_ID,
  CONTRACT_NAME,
  KeyPair.fromString(credentials.private_key)
)

export const nearConfig = {
  networkId: NETWORK_ID,
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: CONTRACT_NAME,
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {},
  deps: {keyStore}
}
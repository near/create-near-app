import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'
import Big from 'big.js';

import getConfig from './config'
const { networkId } = getConfig('testnet')

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const submitButton = document.querySelector('form button')

document.querySelector('form').onsubmit = async (event) => {
  event.preventDefault()

  // get elements from the form using their id attribute
  const { fieldset } = event.target.elements

  // disable the form while the value gets updated on-chain
  fieldset.disabled = true

  try {
    await window.contract.nft_mint({
      token_id: window.accountId, 
      receiver_id: window.accountId,
      metadata: { 
        "title": "Funny bunny", 
        "description": "Thanks for visiting my page",
        "media": "https://bafkreihrqxdfhu4bn4l2uvh52tjfepbfn2henu4zfuwca6c4mzus62phg4.ipfs.dweb.link/",
        "copies": 1
        }
      }, BOATLOAD_OF_GAS,
      Big(0.1).times(10 ** 24).toFixed())
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  } finally {
    fieldset.disabled = false;
  }

}

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-out-flow').style.display = 'block'
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-in-flow').style.display = 'block'

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId
  })

  // populate links in the notification box
  const accountLink = document.querySelector('[data-behavior=notification] a:nth-of-type(1)')
  accountLink.href = accountLink.href + window.accountId
  accountLink.innerText = '@' + window.accountId
  const contractLink = document.querySelector('[data-behavior=notification] a:nth-of-type(2)')
  contractLink.href = contractLink.href + window.contract.contractId
  contractLink.innerText = '@' + window.contract.contractId

  // update with selected networkId
  accountLink.href = accountLink.href.replace('testnet', networkId)
  contractLink.href = contractLink.href.replace('testnet', networkId)
}

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    if (window.walletConnection.isSignedIn()) { 
      signedInFlow()
      if (findGetParameter("transactionHashes") !== null) {
        // show notification
        document.querySelector('[data-behavior=notification]').style.display = 'block'

        // remove notification again after css animation completes
        // this allows it to be shown again next time the form is submitted
        setTimeout(() => {
          document.querySelector('[data-behavior=notification]').style.display = 'none'
        }, 11000)
      }
    }
    else signedOutFlow()
  })
  .catch(console.error)

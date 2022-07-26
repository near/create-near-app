import 'regenerator-runtime/runtime';
import {
  initContract,
  signInWithNearWallet,
  signOutNearWallet,
  setGreetingOnContract,
  getGreetingFromContract,
} from './near-api';

document.querySelector('form').onsubmit = doUserAction;
document.querySelector('#sign-in-button').onclick = signInWithNearWallet;
document.querySelector('#sign-out-button').onclick = signOutNearWallet;

// ====== Initialize the API for NEAR ======
window.nearInitPromise = initContract()
  .then(() => {
    if (window.walletConnection.isSignedIn()) {
      signedInFlow();
    } else {
      signedOutFlow();
    }
  })
  .catch(alert);

// Take the new greeting and send it to the contract
async function doUserAction(event) {
  event.preventDefault();
  const { greeting } = event.target.elements;
  document
    .querySelector('#signed-in-flow main')
    .classList.add('please-wait');
  try {
    // ===== Call smart-contract to save the value on then blockchain =====
    await setGreetingOnContract(greeting.value);
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    );
    throw e;
  }

  // ===== Fetch the data from the blockchain =====
  await fetchGreeting();
  document
    .querySelector('#signed-in-flow main')
    .classList.remove('please-wait');
}

// Get greeting from the contract on chain
async function fetchGreeting() {
  const currentGreeting = await getGreetingFromContract();

  document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
    el.innerText = currentGreeting;
    el.value = currentGreeting;
  });
}

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-in-flow').style.display = 'none';
  document.querySelector('#signed-out-flow').style.display = 'block';

  fetchGreeting();
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-out-flow').style.display = 'none';
  document.querySelector('#signed-in-flow').style.display = 'block';
  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId;
  });

  fetchGreeting();
}

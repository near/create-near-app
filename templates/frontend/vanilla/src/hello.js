import { Wallet } from './near-wallet';

const HELLO_NEAR = 'hello.near-examples.testnet';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ network: 'testnet' });

// Setup on page load
window.onload = async () => {
  let isSignedIn = await wallet.startUp();
  isSignedIn ? signedInUI() : signedOutUI();
  getGreeting();
};

// Button clicks
document.querySelector('form').onsubmit = setGreeting;
document.querySelector('#sign-in-button').onclick = () => { wallet.signIn(); };
document.querySelector('#sign-out-button').onclick = () => { wallet.signOut(); };

async function setGreeting(event) {
  event.preventDefault();

  // handle UI
  document.querySelector('#signed-in').classList.add('please-wait');

  // use the wallet to send the greeting to the Smart Contract
  const { greeting } = event.target.elements;
  await wallet.callMethod({ method: 'set_greeting', args: { greeting: greeting.value }, contractId: HELLO_NEAR });

  // query the new greeting
  await getGreeting();

  // handle UI
  document.querySelector('#signed-in').classList.remove('please-wait');
}

async function getGreeting() {
  // use the wallet to query the Smart Contract
  const currentGreeting = await wallet.viewMethod({ method: 'get_greeting', contractId: HELLO_NEAR });

  // Display it
  document.querySelector('#displayGreeting').innerText = currentGreeting;
}

// UI: Hide signed-in elements
function signedOutUI() { hide('#signed-in'); hide('#sign-out-button'); }

// UI: Hide signed-out elements
function signedInUI() {
  hide('#signed-out');
  hide('#sign-in-button');

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = wallet.accountId;
  });
}

function hide(id) {
  document.querySelectorAll(id).forEach(el => el.style.display = 'none');
}
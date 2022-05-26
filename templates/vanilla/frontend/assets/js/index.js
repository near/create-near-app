import 'regenerator-runtime/runtime'
import { initContract, login, logout, set_greeting, get_greeting } from './near/utils'

// On submit, get the greeting and send it to the contract
document.querySelector('form').onsubmit = async (event) => {
  event.preventDefault()

  // get elements from the form using their id attribute
  const { fieldset, greeting } = event.target.elements

  // disable the form while the value gets updated on-chain
  fieldset.disabled = true

  try {
    await set_greeting(greeting.value)
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  }

  // re-enable the form, whether the call succeeded or failed
  fieldset.disabled = false

  // update the greeting in the UI
  await fetchGreeting()
}

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout

async function fetchGreeting() {
  // Get greeting from the contract
  const currentGreeting = await get_greeting()

  // Set all elements marked as greeting with the current greeting
  document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
    el.innerText = currentGreeting
    el.value = currentGreeting
  })
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(flow)
  .catch(console.error)

function flow(){
  if (window.walletConnection.isSignedIn()){
    signedInFlow()
  }else{
    signedOutFlow()
  }
}

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-out-flow').style.display = 'block'
  fetchGreeting()
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-in-flow').style.display = 'block'

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId
  })

  fetchGreeting()
}

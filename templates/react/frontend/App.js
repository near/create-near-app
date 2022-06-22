import 'regenerator-runtime/runtime'
import React from 'react'

import './assets/global.css'

import { getGreetingFromContract, setGreetingOnContract } from './near-api'
import { EducationalText, NearInformation, SignInPrompt, SignOutButton } from './ui-components'


export default function App() {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState()

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true)

  // Get blockchian state once on component load
  React.useEffect(() => {
    getGreetingFromContract()
      .then(val => {
        setUiPleaseWait(false)
        setValueFromBlockchain(val)
      }).catch(e => {
        alert(e)
        setUiPleaseWait(false)
      })
  }, [])

  /// If user not signed-in with wallet - show prompt
  if (!window.walletConnection.isSignedIn()) {
    // Sign-in flow will reload the page later
    return <SignInPrompt greeting={valueFromBlockchain}/>
  }

  function changeGreeting(e) {
    e.preventDefault()
    setUiPleaseWait(true)
    const { greetingInput } = e.target.elements
    setGreetingOnContract(greetingInput.value)
      .then(getGreetingFromContract)
      .then(val => {
        setValueFromBlockchain(val)
        setUiPleaseWait(false)
      })
      .catch(e => {
        alert(e)
        setUiPleaseWait(false)
      })
  }

  return (
    <>
      <SignOutButton accountId={window.accountId}/>
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>
          <span className="greeting">{valueFromBlockchain}</span>
        </h1>
        <form onSubmit={changeGreeting} className='change'>
          <label>Change greeting:</label>
          <div>
            <input
              autoComplete="off"
              defaultValue={valueFromBlockchain}
              id="greetingInput"
            />
            <button>Save</button>
          </div>
        </form>
        <NearInformation greeting={valueFromBlockchain}/>
        <EducationalText/>
      </main>
    </>
  )
}

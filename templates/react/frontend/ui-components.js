import { signInWithNearWallet, signOutNearWallet } from './near-api'
import { getConfig } from './config'
import React from 'react'

export function SignInPrompt({greeting}) {
  return (
    <main>
      <h1>
        <span className="greeting">{greeting}</span>
      </h1>
      <h2>
        Welcome to NEAR!
      </h2>
      <p>
        Your contract is storing a greeting message in the NEAR blockchain. To
        change it you need to sign in using the NEAR Wallet. It is very simple,
        just use the button below.
      </p>
      <p>
        Do not worry, this app runs in the test network ("testnet"). It works
        just like the main network ("mainnet"), but using NEAR Tokens that are
        only for testing!
      </p>
      <br/>
      <p style={{ textAlign: 'center' }}>
        <button onClick={signInWithNearWallet}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  )
}

export function SignOutButton({accountId}) {
  return (
    <button style={{ float: 'right' }} onClick={signOutNearWallet}>
      Sign out {accountId}
    </button>
  )
}

export function NearInformation({ greeting }) {
  const { networkId, contractName } = getConfig(process.env.NODE_ENV || 'testnet')
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`

  return (
    <ul className='information'>
      <li>Your account ID:&nbsp;
        <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
          <code>{window.accountId}</code>
        </a>
      </li>
      <li>Network ID: <code>{networkId}</code></li>
      <li>Contract name:&nbsp;
        <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${contractName}`}>
          <code>{contractName}</code>
        </a>
      </li>
      <li>Current state on the blockchain: <br/>
        <code>
          &#123; greeting: '{greeting}' &#125;
        </code>
      </li>
    </ul>
  )
}

export function EducationalText() {
  return (
    <>
      <p>
        Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
      </p>
      <ol>
        <li>
          Look in <code>src/App.js</code> and <code>src/utils.js</code> – you'll see <code>get_greeting</code> and <code>set_greeting</code> being called on <code>contract</code>. What's this?
        </li>
        <li>
          Ultimately, this <code>contract</code> code is defined in <code>assembly/main.ts</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
        <li>
          When you run <code>yarn dev</code>, the code in <code>assembly/main.ts</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code> at the <code>scripts</code> section to find the <code>dev</code> command.</li>
      </ol>
      <hr />
      <p>
        To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
      </p>
    </>
  )
}

<template>
  <div id="root">

  <template v-if="signedIn">
    <button className="link" style="float: right" v-on:click="logout">
      Sign out
    </button>
    <main>
      <h1>
        <label htmlFor="greeting" style="color: var(--secondary);border-bottom: 2px solid var(--secondary);">
          {{ savedGreeting }}
        </label>
        {{ accountId }}
      </h1>
      <form v-on:submit.prevent="saveGreeting">
        <fieldset id="fieldset">
          <label htmlFor="greeting" style="display:block; color:var(--gray);margin-bottom:0.5em;">
            Change greeting
          </label>
          <div style="display:flex">
            <input v-model="newGreeting" 
              autoComplete="off"
              id="greeting"
              style="flex:1"
            />
            <button style="border-radius:0 5px 5px 0">
              Save
            </button>
          </div>
        </fieldset>
      </form>
      <p>
        Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
      </p>
      <ol>
        <li>
          Look in <code>src/App.vue</code> and <code>src/utils.js</code> 
          - you'll see <code>getGreeting</code> 
          and <code>setGreeting</code> being called on <code>contract</code>. What's this?
        </li>
        <li>
          Ultimately, this <code>contract</code> code is defined in <code>assembly/main.ts</code> 
          - this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/roles/developer/contracts/intro">smart contract</a>.
        </li>
        <li>
          When you run <code>npm run dev</code> or <code>yarn dev</code>, the code in <code>assembly/main.ts</code> 
          gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code> 
          at the <code>scripts</code> section to find the <code>dev</code> command.
        </li>
      </ol>
      <hr />
      <p>
          To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
      </p>
    </main>
    <Notification v-show="notificationVisible" 
                  ref="notification"
                  :networkId="networkId"
                  :msg="'called method: setGreeting'"
                  :visible="false"
                  />
  </template>

  <template v-else>
    <main>
      <h1>Welcome to NEAR!</h1>
      <p>
        To make use of the NEAR blockchain, you need to sign in. The button
        below will sign you in using NEAR Wallet.
      </p>
      <p>
        By default, when your app runs in "development" mode, it connects
        to a test network ("testnet") wallet. This works just like the main
        network ("mainnet") wallet, but the NEAR Tokens on testnet aren't
        convertible to other currencies - they're just for testing!
      </p>
      <p>
        Go ahead and click the button below to try it out:
      </p>
      <p style="text-align:center; margin-top:2.5em">
        <button v-on:click="login">Sign in</button>
      </p>
    </main>
  </template>
</div>
</template>

<script>

import getConfig from './config'
const nearConfig = getConfig(process.env.NODE_ENV || 'development')

console.log(`networkId:${nearConfig.networkId} CONTRACT_NAME:${nearConfig.contractName}`);

import { login, logout, onSubmit } from './utils'  
import './global.css'

import Notification from './components/Notification.vue'

export default {
  created() {
    document.title = "near-blank-project"
    if (this.signedIn) {
        this.retrieveSavedGreeting()
    }
  },
  name: 'App',
  components: {
    Notification
  },
  data: function () {
    return {
      savedGreeting: "Hello",
      newGreeting: "Hello",
      notificationVisible: false,
      networkId: nearConfig.networkId,
    }
  },
  computed: {
    signedIn() { return window.walletConnection.isSignedIn() },
    accountId() { return window.accountId }
  },

  methods: {

    login() {
      console.log("calling utils.login")
      login()
      this.retrieveSavedGreeting()
    },

  logout: logout,

  retrieveSavedGreeting: () => {
    //retrieve greeting
    window.contract.getGreeting({ accountId: window.accountId })
      .then(greetingFromContract => {
        this.savedGreeting = greetingFromContract
        this.newGreeting = greetingFromContract
    })
  },

  saveGreeting: async function (event) {
    this.updating = true;
    // fire frontend-agnostic submit behavior, including data persistence
    // look in utils.js to see how this updates data on-chain!
    await onSubmit(event) //gets data directly from HTML elements

    // update upper `greeting` message with persisted value
    this.savedGreeting = this.newGreeting;
    this.updating = false

    this.notificationVisible = true; //show new notification

    // remove Notification again after css animation completes
    // this allows it to be shown again next time the form is submitted
    setTimeout(() => {
      this.notificationVisible = false
    }, 11000)
    }
  }

}
</script>


<template>
  <div>
    <button class="link" style="float: right" v-on:click="logout">Sign out</button>
    <main>
      <h1>
        <label
          for="greeting"
          style="color: var(--secondary);border-bottom: 2px solid var(--secondary);"
        >{{ savedGreeting }}</label>
        {{ accountId }}
      </h1>
      <form v-on:submit.prevent="saveGreeting">
        <fieldset ref="fieldset">
          <label
            for="greeting"
            style="display:block; color:var(--gray);margin-bottom:0.5em;"
          >Change greeting</label>
          <div style="display:flex">
            <input v-model="newGreeting" autocomplete="off" id="greeting" style="flex:1" />
            <button id="save" style="border-radius:0 5px 5px 0">Save</button>
          </div>
        </fieldset>
      </form>
      <p>Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:</p>
      <ol>
        <li>
          Look in
          <code>src/App.vue</code> and
          <code>src/utils.js</code>
          - you'll see
          <code>getGreeting</code>
          and
          <code>setGreeting</code> being called on
          <code>contract</code>. What's this?
        </li>
        <li>
          Ultimately, this
          <code>contract</code> code is defined in
          <code>assembly/main.ts</code>
          - this is the source code for your
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.near.org/docs/develop/contracts/overview"
          >smart contract</a>.
        </li>
        <li>
          When you run
          <code>npm run dev</code> or
          <code>yarn dev</code>, the code in
          <code>assembly/main.ts</code>
          gets deployed to the NEAR testnet. You can see how this happens by looking in
          <code>package.json</code>
          at the
          <code>scripts</code> section to find the
          <code>dev</code> command.
        </li>
      </ol>
      <hr />
      <p>
        To keep learning, check out
        <a
          target="_blank"
          rel="noreferrer"
          href="https://docs.near.org"
        >the NEAR docs</a> or look through some
        <a
          target="_blank"
          rel="noreferrer"
          href="https://examples.near.org"
        >example apps</a>.
      </p>
    </main>

    <Notification
      v-show="notificationVisible"
      ref="notification"
      :networkId="networkId"
      :msg="'called method: setGreeting'"
      :contractId="contractId"
      :visible="false"
    />
  </div>
</template>

<script>
import { logout } from "../utils"

import Notification from "./Notification.vue"

export default {
  name: "SignedIn",

  beforeMount() {
    if (this.isSignedIn) {
      this.retrieveSavedGreeting()
    }
  },

  components: {
    Notification,
  },

  data: function () {
    return {
      savedGreeting: "",
      newGreeting: "",
      notificationVisible: false,
    }
  },

  computed: {
    isSignedIn() {
      return window.walletConnection? window.walletConnection.isSignedIn(): false
    },
    accountId() {
      return window.accountId
    },
    contractId() {
      return window.contract? window.contract.contractId: null
    },
    networkId() {
      return window.networkId
    },
  },

  methods: {
    retrieveSavedGreeting() {
      //retrieve greeting
      window.contract
        .getGreeting({ accountId: window.accountId })
        .then((greetingFromContract) => {
          this.savedGreeting = greetingFromContract
          this.newGreeting = greetingFromContract
        })
    },

    saveGreeting: async function (event) {
      // fired on form submit button used to update the greeting

      // disable the form while the value gets updated on-chain
      this.$refs.fieldset.disabled = true

      try {
        
        // make an update call to the smart contract
        await window.contract.setGreeting({
          // pass the new greeting
          message: this.newGreeting,
        })
      } catch (e) {
        alert(
          "Something went wrong! " +
            "Maybe you need to sign out and back in? " +
            "Check your browser console for more info."
        )
        throw e //re-throw
      } finally {
        // re-enable the form, whether the call succeeded or failed
        this.$refs.fieldset.disabled = false
      }

      // update savedGreeting with persisted value
      this.savedGreeting = this.newGreeting

      this.notificationVisible = true //show new notification

      // remove Notification again after css animation completes
      // this allows it to be shown again next time the form is submitted
      setTimeout(() => {
        this.notificationVisible = false
      }, 11000)

    },

    logout: logout,
  },
}
</script>

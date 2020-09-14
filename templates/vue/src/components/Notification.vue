<template>
  <div class="notification">
    <aside>
      <a target="_blank" rel="noreferrer" v-bind:href="urlPrefix + '/' + accountId">{{ accountId }}</a>
      <br />
      {{ msg }}
      <br />in contract:
      <a
        target="_blank"
        rel="noreferrer"
        v-bind:href="urlPrefix + '/' + contractId"
      >{{ contractId }}</a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    networkId: String,
    msg: String,
    contractId: String,
  },
  computed: {
    urlPrefix() {
      return "https://explorer." + this.networkId + ".near.org/accounts"
    },
    accountId() {
      return window.accountId
    }
  }
}
</script>

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { initContract } from './utils'

window.nearInitPromise = initContract()
  .then(() => {

    new Vue({
      render: h => h(App),
    }).$mount('#app')

  })
  
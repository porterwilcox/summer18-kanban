import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
let moment = require('moment')

Vue.config.productionTip = false

Vue.use(require('vue-moment'));
new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("authenticate");
  },
  render: h => h(App)
}).$mount('#app')

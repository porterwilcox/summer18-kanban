import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueDragDrop from 'vue-drag-drop'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueDragDrop)
Vue.use(require('vue-moment'));
new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("authenticate");
  },
  render: h => h(App)
}).$mount('#app')

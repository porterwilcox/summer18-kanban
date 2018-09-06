import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import VCard from 'vuetify/es5/components/VCard'


Vue.config.productionTip = false

Vue.use(require('vue-moment'));
Vue.use(Vuetify)
//   , {
//   components: {
//     VCard
//   }
// });
new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("authenticate");
  },
  render: h => h(App)
}).$mount('#app')

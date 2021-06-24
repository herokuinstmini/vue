import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import router from './router'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// let backend = 'http://192.168.1.133:9000/'
let backend = 'https://instmini.herokuapp.com/'
Vue.prototype.hostname = backend


new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')

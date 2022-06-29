import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

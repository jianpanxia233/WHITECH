import Vue from 'vue'
import router from './router';
import store from './store'
import './plugins/element.js';
import './plugins/request.js';
import App from './App.vue'
import '@/assets/fonts/css/icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

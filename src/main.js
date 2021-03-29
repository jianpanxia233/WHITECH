import Vue from 'vue'
import router from './router';
import './plugins/element.js';
import './plugins/request.js';
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './static/css/init.css'
import qs from 'qs'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

Vue.use(MintUI)
Vue.use(BaiduMap, {
  ak: 'UxLmAWfbd3XVDzFvaQoGHeB9WwdWiyna'
})

Vue.config.productionTip = false

const request = axios.create({
  baseURL: '/bus-route-search',
  withCredentials: true,
  timeout: 15000
})
Vue.prototype.$qs = qs
Vue.prototype.$request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

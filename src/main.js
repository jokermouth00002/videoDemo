import moment from 'moment'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/videos?&key=AIzaSyBYy1mf-uEUyT5Qb1iGbboMPBLO21UqVFY&part=snippet,contentDetails&chart=mostPopular&maxResults=50&',
  timeout: 5000
})
Vue.prototype.$bus = new Vue()
Vue.prototype.$api = api
// Vue.use(ElementUI)
Vue.filter('convertToTime', (duration) => {
  const obj = moment.duration(duration)
  return `${obj.minutes()}:${obj.seconds()}`
})
window.moment = moment
window.store = store
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

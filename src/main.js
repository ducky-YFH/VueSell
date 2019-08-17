import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import '@/common/fonts/iconfont.css'
import store from './common/store'
Vue.config.productionTip = false
Vue.use(vueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

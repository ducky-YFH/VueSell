import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
// 引入图标
import '@/common/fonts/iconfont.css'
Vue.config.productionTip = false
Vue.use(vueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

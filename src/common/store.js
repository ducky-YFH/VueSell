import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    foodList: [],
    //  判断food组件是否显示
    foodShow: false,
    collect: []
  },
  mutations: {
    addToList (state, foodList) {
      state.foodList = foodList
    }
  },
  getters: {
    getCount (state) {
      let count = 0
      state.foodList.forEach(item => {
        count += item.count
      })
      return count
    },
    getPrice (state) {
      let price = 0
      state.foodList.forEach(item => {
        price += item.price * item.count
      })
      return price
    }
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    foodCount: 0
  },
  mutations: {
    countAdd (state, foodCount) {
      this.state.foodCount = foodCount
    }
  },
  getters: {

  }
})

export default store

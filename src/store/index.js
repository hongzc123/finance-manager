import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testData: 123,
    menu: []
  },
  getters: {
    getMenu(state) {
      return state.menu
    }
  },
  mutations: {
    setMenu(state, payload) {
      state.menu = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

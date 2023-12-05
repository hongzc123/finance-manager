import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testData: 123,
    menu: [],
    tags: []
  },
  getters: {
    getMenu(state) {
      return state.menu
    },
    getTags(state) {
      return state.tags
    }
  },
  mutations: {
    setMenu(state, payload) {
      state.menu = payload
    },
    addTag(state, tag) {
      console.log(tag)
      if (state.tags.some(t => t.path === tag.path)) return
      state.tags.push(tag)
    },
    removeTag(state, tag) {
      let index = state.tags.findIndex(t => t.path === tag.path)
      state.tags.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
